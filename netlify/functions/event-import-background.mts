import dotenv from 'dotenv';
import { type Config } from '@netlify/functions';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import StoryblokClient from 'storyblok-js-client';
import { compareStoryContent, googleRowToStory } from '../../src/utilities/synchronizedEvents';
import { luxonDate } from '../../src/utilities/dates';
import { DateTime } from 'luxon';

dotenv.config();

export default async (req: Request) => {
  console.log('=== START Import Background Function ===');
  try {
    const secret = new URL(req.url).searchParams.get('secret');

    if (!secret) {
      throw new Error('Missing secret');
    }

    if (secret !== process.env.EVENT_IMPORT_SECRET) {
      throw new Error('Secret incorrect');
    }

    // stop, test, or run
    const mode = process.env.EVENT_IMPORT_MODE ?? 'stop';

    if (mode === 'stop') {
      throw new Error('Import mode set to "stop"');
    }

    const run = mode !== 'run';
    const spaceId = process.env.SPACE_ID ?? '';
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '';
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? '';
    const hivebriteSheetId = process.env.SHEET_ID_HIVEBRITE ?? '';
    const cventSheetId = process.env.SHEET_ID_CVENT ?? '';

    if (!email || !key || !spaceId || !hivebriteSheetId || !cventSheetId) {
      throw new Error('Missing required values');
    }

    console.log('Starting Google auth...');
    const auth = new JWT({
      email,
      key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
    console.log('Google auth done!');

    const googleStories: any[] = [];

    console.log('Fetching Hiverbrite data...');
    const hivebriteDoc = new GoogleSpreadsheet(hivebriteSheetId, auth);
    await hivebriteDoc.loadInfo();
    const hivebriteSheet = hivebriteDoc.sheetsByIndex[0];
    const hivebriteRows = await hivebriteSheet.getRows();
    console.log('Fetching Hiverbrite data done!');
    
    hivebriteRows.forEach((row) => {
      googleStories.push(googleRowToStory(row.toObject(), 'Hivebrite'));
    });

    console.log('Fetching Cvent data...');
    const cventDoc = new GoogleSpreadsheet(cventSheetId, auth);
    await cventDoc.loadInfo();
    const cventSheet = cventDoc.sheetsByIndex[0];
    const cventRows = await cventSheet.getRows();
    console.log('Fetching Cvent data done!');
    
    cventRows.forEach((row) => {
      googleStories.push(googleRowToStory(row.toObject(), 'Cvent'));
    });

    const storyblokContent = new StoryblokClient({
      accessToken: process.env.STORYBLOK_WEBHOOK_PREVIEW_ACCESS_TOKEN,
    });

    const storyblokManagement = new StoryblokClient({
      oauthToken: process.env.STORYBLOK_MANAGEMENT_OAUTH_TOKEN,
    });

    console.log('Fetching Storyblok events...');
    const sbPublishedEvents = await storyblokContent.getAll('cdn/stories', { starts_with: 'events/sync/', excluding_slugs: 'events/sync/archived/*', content_type: 'synchronizedEvent' }) ?? [];
    const sbUnpublishedEvents = await storyblokContent.getAll('cdn/stories', { starts_with: 'events/sync/', excluding_slugs: 'events/sync/archived/*', content_type: 'synchronizedEvent', version: 'draft' }) ?? [];
    const sbEvents = [...sbPublishedEvents.map((s) => ({ ...s, isPublished: true })), ...sbUnpublishedEvents.map((s) => ({ ...s, isPublished: false }))];
    console.log('Fetching Storyblok events done!');

    const syncedEvents = new Map();
    const manualEvents = new Map();
    // We can't be too aggressive with the cutoff due to timezones.
    // We'll consider anything midnight (UTC) - 2 as "old" for the sync purposes
    // and do some dynamic date filtering in the front end.
    const OldCutoff = DateTime.utc().startOf('day').minus({ days: 2 });

    googleStories.forEach((event) => {
      console.log('Google event: ', { event });
      const id = event?.content?.externalId;

      if (id) {
        syncedEvents.set(event.content.externalId, { google: event, storyblok: undefined });
      } else {
        console.log('No ID for Google event: ', event);
      }
    });
    sbEvents.forEach((story) => {
      console.log('SB story: ', { story });
      const id = story.content.externalId;

      if (id) {
        const existing = syncedEvents.get(id);
        const value = existing
          ? { ...existing, storyblok: story }
          : { google: undefined, storyblok: story }

        syncedEvents.set(id, value);
      } else {
        console.log('No ID for SB event: ', story.full_slug);
        manualEvents.set(story.id, story);
      }
    });

    syncedEvents.forEach(async ({ google, storyblok }, id) => {
      console.log('>>> Processing: ', id);
      try {
        if (google && storyblok) {
          console.log('Exists in Google and Storyblok...');
          // Compare and update as needed then publish if already published
          if (!compareStoryContent(google.content, storyblok.content)) {
            console.log('No changes needed.');
            console.log('Processing complete: ', id);
            return;
          }

          console.log('Changes detected. Syncing changes to Storyblok...');
          if (run) {
            await storyblokManagement.put(`spaces/${spaceId}/stories/${storyblok.id}`, {
              story: google,
              publish: storyblok.isPublished ? 1 : 0, // Don't re-publish manually unpublished events
            });
          }
          console.log('Synced!');
        }

        if (google) {
          console.log('Exists in Google only. Posting to Storyblok...');
          // Post to SB then publish
          if (run) {
            await storyblokManagement.post(`spaces/${spaceId}/stories`, {
              story: google,
              publish: 1,
            });
          }
          console.log('Posted!');
        }

        if (storyblok) {
          const isOld = luxonDate(
            storyblok.content.endOverride 
            || storyblok.content.end 
            || storyblok.content.startOverride 
            || storyblok.content.start
          ) < OldCutoff;

          if (storyblok.isPublished) {
            // Unpublish
            console.log('Exists in Storyblok only. Unpublishing...');
            if (run) {
              await storyblokManagement.get(`spaces/${spaceId}/stories/${storyblok.id}/unpublish`);
            }
            console.log('Unpublished!');
          }

          if (isOld) {
            console.log('Story is old. Moving...');
            if (run) {
              await storyblokManagement.put(`spaces/${spaceId}/stories/${storyblok.id}`, {
                story: { 
                  ...storyblok,
                  full_slug: `events/sync/archived/${storyblok.slug}`,
                },
              });
            }
            console.log('Unpublished!');
          }
        }
      } catch(err) {
        console.error('Error during proccessing: ', err);
      }

      console.log('Processing complete: ', id);
    });

    manualEvents.forEach(async (story, id) => {
      console.log('>>> Processing Manual Event: ', id);

      try {
        const isOld = luxonDate(
          story.content.endOverride 
          || story.content.end 
          || story.content.startOverride 
          || story.content.start
        ) < OldCutoff;

        console.log({ 
          parsed: luxonDate(
            story.content.endOverride 
            || story.content.end 
            || story.content.startOverride 
            || story.content.start), 
          endOverride: story.content.endOverride, 
          end: story.content.end, 
          startOverride: story.content.startOverride,
          start: story.content.start,
        });

        if (isOld) {
          console.log('Story is old. Moving...');
          if (run) {
            await storyblokManagement.put(`spaces/${spaceId}/stories/${story.id}`, {
              story: { 
                ...story,
                full_slug: `events/sync/archived/${story.slug}`,
              },
            });
          }
          console.log('Unpublished!');
        }
      } catch (err) {
        console.error('Error during proccessing: ', err);
      }

      console.log('Processing complete: ', id);
    });
  } catch (err) {
    console.error('Error: ', err);
  }

  console.log('=== END Import Background Function ===');
};

export const config: Config = {
  path: '/webhook/sb/event-import',
};
