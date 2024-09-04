import dotenv from 'dotenv';
import { type Config } from '@netlify/functions';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import StoryblokClient from 'storyblok-js-client';
import { compareStoryContent, googleRowToStory, combineStories, setStoryRegion, storyHasValidLatLong } from '../../src/utilities/synchronizedEvents';
import { luxonDate } from '../../src/utilities/dates';
import { DateTime } from 'luxon';

dotenv.config();

// Keep SB API happy
const delay = (m = 250) => new Promise((resolve) => {
  setTimeout(() => resolve(null), m);
});

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

    console.log(`Running in ${mode} mode`);

    const run = mode === 'run';
    const spaceId = process.env.SPACE_ID ?? '';
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '';
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? '';
    const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY ?? '';
    const hivebriteSheetId = process.env.SHEET_ID_HIVEBRITE ?? '';
    const cventSheetId = process.env.SHEET_ID_CVENT ?? '';
    const eventFolderId = process.env.EVENT_FOLDER_ID ?? '';
    const eventArchiveFolderId = process.env.EVENT_ARCHIVE_FOLDER_ID ?? '';
    const formatDatasourceId =  process.env.EVENT_DATASOURCE_FORMAT_ID ?? '';
    const subjectDatasourceId = process.env.EVENT_DATASOURCE_SUBJECT_ID ?? '';

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
    console.log(`Fetching Hiverbrite data done! (${hivebriteRows?.length ?? 0} found)`);
    
    hivebriteRows.forEach((row) => {
      googleStories.push(googleRowToStory(row.toObject(), 'hivebrite'));
    });

    console.log('Fetching Cvent data...');
    const cventDoc = new GoogleSpreadsheet(cventSheetId, auth);
    await cventDoc.loadInfo();
    const cventSheet = cventDoc.sheetsByIndex[0];
    const cventRows = await cventSheet.getRows();
    console.log(`Fetching Cvent data done! (${cventRows?.length ?? 0} found)`);
    
    cventRows.forEach((row) => {
      googleStories.push(googleRowToStory(row.toObject(), 'cvent'));
    });

    const storyblokContent = new StoryblokClient({
      accessToken: process.env.STORYBLOK_WEBHOOK_PREVIEW_ACCESS_TOKEN,
    });

    const storyblokManagement = new StoryblokClient({
      oauthToken: process.env.STORYBLOK_MANAGEMENT_OAUTH_TOKEN,
    });

    const archiveCutoff = DateTime.utc().startOf('day').minus({ days: 180 }).toFormat('yyyy-MM-dd');

    console.log('Fetching Storyblok datasources...');
    const formatDatasource = await storyblokManagement.getAll(`/spaces/${spaceId}/datasource_entries`, {
      datasource_id: formatDatasourceId,
    } as any) ?? [];
    const subjectDatasource = await storyblokManagement.getAll(`/spaces/${spaceId}/datasource_entries`, {
      datasource_id: subjectDatasourceId,
    } as any) ?? [];
    console.log('Fetching Storyblok datasources done!');
    console.log(`(${formatDatasource?.length ?? 0} formats, ${subjectDatasource?.length ?? 0} subjects)`);

    console.log('Fetching Storyblok events...');
    const sbPublishedEvents = await storyblokContent.getAll('cdn/stories', { 
      starts_with: 'events/sync/',  
      content_type: 'synchronizedEvent',
      version: 'published',
      per_page: 100,
    }) ?? [];
    const sbUnpublishedEvents = await storyblokContent.getAll('cdn/stories', { 
      starts_with: 'events/sync/', 
      content_type: 'synchronizedEvent', 
      version: 'draft',
      per_page: 100,
    }) ?? [];
    const oldArchivedPublishedEvents = await storyblokContent.getAll('cdn/stories', { 
      starts_with: 'events/sync-archive/', 
      filter_query: { __or: [
        { end: { lt_date: archiveCutoff }},
        { endOverride: { lt_date: archiveCutoff }}
      ]}, 
      content_type: 'synchronizedEvent',
      version: 'published',
      per_page: 100,
    }) ?? [];
    const oldArchivedUnpublishedEvents = await storyblokContent.getAll('cdn/stories', { 
      starts_with: 'events/sync-archive/', 
      filter_query: { __or: [
        { end: { lt_date: archiveCutoff }},
        { endOverride: { lt_date: archiveCutoff }}
      ]}, 
      content_type: 'synchronizedEvent', 
      version: 'draft',
      per_page: 100,
    }) ?? [];
    const sbEvents = [...sbPublishedEvents?.map((s) => ({ ...s, isPublished: true })), ...sbUnpublishedEvents?.map((s) => ({ ...s, isPublished: false }))];
    const oldArchivedEvents = [...oldArchivedPublishedEvents, ...oldArchivedUnpublishedEvents].filter((s) => !!s);
    console.log(`Fetching Storyblok events done! (${sbEvents?.length ?? 0} found)`);

    const syncedEvents = new Map();
    const manualEvents = new Map();
    const knownFormats = new Set<string>(formatDatasource?.map?.((d) => d.value));
    const knownSubjects = new Set<string>(subjectDatasource?.map?.((d) => d.value));
    const incomingFormats: string[] = [];
    const incomingSubjects: string[] = [];
    // We can't be too aggressive with the cutoff due to timezones.
    // We'll consider anything midnight (UTC) - 2 as "old" for the sync purposes
    // and do some dynamic date filtering in the front end.
    const OldCutoff = DateTime.utc().startOf('day').minus({ days: 2 });

    googleStories.forEach((event) => {
      const id = event?.content?.externalId;

      const format: string[] = event?.content?.format ?? [];
      const subject: string[] = event?.content?.subject ?? [];

      format.forEach((f) => incomingFormats.push(f));
      subject.forEach((t) => incomingSubjects.push(t));

      if (id) {
        syncedEvents.set(event.content.externalId, { google: event, storyblok: undefined });
      } else {
        console.log('No ID for Google event: ', event?.full_slug || event?.name || '???');
      }
    });
    sbEvents.forEach((story) => {
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

    const newFormats = new Set(incomingFormats.filter((f) => !knownFormats.has(f)));
    const newSubjects = new Set(incomingSubjects.filter((s) => !knownSubjects.has(s)));

    for (const format of newFormats) {
      try {
        console.log('Adding format datasource entry: ', format);
        if (run) {
          await storyblokManagement.post(`/spaces/${spaceId}/datasource_entries`, {
            datasource_entry: {
              name: format,
              value: format,
              datasource_id: formatDatasourceId,
            }
          } as any);
          await delay();
        }
      } catch (err) {
        console.log('Error during format datasource update: ', err);
      }
    }

    for (const subject of newSubjects) {
      try {
        console.log('Adding subject datasource entry: ', subject);
        if (run) {
          await storyblokManagement.post(`/spaces/${spaceId}/datasource_entries`, {
            datasource_entry: {
              name: subject,
              value: subject,
              datasource_id: subjectDatasourceId,
            }
          } as any);
          await delay();
        }
      } catch (err) {
        console.log('Error during subject datasource update: ', err);
      }
    }

    for (const [id, {google, storyblok}] of syncedEvents) {
      console.log('>>> Processing: ', id);
      try {
        if (google && storyblok) {
          const isGoogleOld = luxonDate(
            google.content.endOverride 
            || google.content.end 
            || google.content.startOverride 
            || google.content.start
          ) < OldCutoff;

          const isSbOld = luxonDate(
            storyblok.content.endOverride 
            || storyblok.content.end 
            || storyblok.content.startOverride 
            || storyblok.content.start
          ) < OldCutoff;

          const isOld = isGoogleOld && isSbOld;

          const isMissingRegion = !storyblok.content.region && storyHasValidLatLong(storyblok);

          console.log('Exists in Google and Storyblok...');

          if (isOld) {
            console.log('Story is old. Unpublishing and moving...');
            if (run) {
              await storyblokManagement.get(`/spaces/${spaceId}/stories/${storyblok.id}/unpublish`);
              await delay();
              await storyblokManagement.put(`/spaces/${spaceId}/stories/${storyblok.id}`, {
                story: { 
                  ...storyblok,
                  parent_id: eventArchiveFolderId,
                },
              });
              await delay();
            }
            console.log('Done!');
            console.log('Processing complete: ', id);
            continue;
          }

          if (!isMissingRegion && !compareStoryContent(google.content, storyblok.content)) {
            console.log('No changes needed.');
            console.log('Processing complete: ', id);
            continue;
          }

          console.log('Changes detected. Syncing changes to Storyblok...');

          if (run) {
            console.log('Generating region...');
            const combinedStory = await setStoryRegion(combineStories(google, storyblok), googleMapsKey);
            console.log(combinedStory.content.region ? 'Generating region done!' : 'Generating region failed!');
            await storyblokManagement.put(`/spaces/${spaceId}/stories/${storyblok.id}`, {
              story: {
                ...combinedStory,
                parent_id: eventFolderId,
              },
              publish: storyblok.isPublished ? 1 : 0, // Don't re-publish manually unpublished events
            });
            await delay();
          }
          console.log('Synced!');
        } else if (google) {
          const isOld = luxonDate(
            google.content.endOverride 
            || google.content.end 
            || google.content.startOverride 
            || google.content.start
          ) < OldCutoff;

          if (isOld) {
            console.error(`Story ${id} is too old to import`);
            console.log('Processing complete: ', id);
            continue;
          }

          console.log('Exists in Google only. Posting to Storyblok...');
          // Post to SB then publish
          if (run) {
            console.log('Generating region...');
            const updatedGoogle = await setStoryRegion(google, googleMapsKey);
            console.log('Generating region done!');
            await storyblokManagement.post(`/spaces/${spaceId}/stories`, {
              story: {
                ...updatedGoogle,
                parent_id: eventFolderId,
              },
              publish: 1,
            });
            await delay();
          }
          console.log('Posted!');
        } else if (storyblok) {
          console.log('Exists in Storyblok only.');
          const isOld = luxonDate(
            storyblok.content.endOverride 
            || storyblok.content.end 
            || storyblok.content.startOverride 
            || storyblok.content.start
          ) < OldCutoff;

          if (isOld) {
            console.log('Story is old. Unpublishing and moving...');
            if (run) {
              await storyblokManagement.get(`/spaces/${spaceId}/stories/${storyblok.id}/unpublish`);
              await delay();
              await storyblokManagement.put(`/spaces/${spaceId}/stories/${storyblok.id}`, {
                story: { 
                  ...storyblok,
                  parent_id: eventArchiveFolderId,
                },
              });
              await delay();
            }
            console.log('Done!');
          } else if (storyblok.isPublished) {
            console.log('Unpublishing...');
            if (run) {
              await storyblokManagement.get(`/spaces/${spaceId}/stories/${storyblok.id}/unpublish`);
              await delay();
            }
            console.log('Unpublished!');
          }
        }
      } catch(err) {
        console.error('Error during proccessing: ', err);
      }

      console.log('Processing complete: ', id);
    }

    for (const [id, story] of manualEvents) {
      console.log('>>> Processing Manual Event: ', id);

      try {
        const isOld = luxonDate(
          story.content.endOverride 
          || story.content.end 
          || story.content.startOverride 
          || story.content.start
        ) < OldCutoff;

        if (isOld) {
          console.log('Story is old. Unpublishing and moving...');
          if (run) {
            await storyblokManagement.get(`/spaces/${spaceId}/stories/${story.id}/unpublish`);
            await delay();
            await storyblokManagement.put(`/spaces/${spaceId}/stories/${story.id}`, {
              story: { 
                ...story,
                parent_id: eventArchiveFolderId,
              },
            });
            await delay();
          }
          console.log('Done!');
        }
      } catch (err) {
        console.error('Error during proccessing: ', err);
      }

      console.log('Processing complete: ', id);
    }

    for (const story of oldArchivedEvents) {
      console.log('>>> Processing expired archived event: ', story.id);

      try {
        console.log('Deleting...');
        if (run) {
          await storyblokManagement.delete(`/spaces/${spaceId}/stories/${story.id}`, {});
          await delay();
        }
        console.log('Deleted!');
      } catch (err) {
        console.error('Error during processing: ', err);
      }

      console.log('Processing complete: ', story.id);
    }
  } catch (err) {
    console.error('Error: ', err);
  }

  console.log('=== END Import Background Function ===');
};

export const config: Config = {
  path: '/webhook/sb/event-import',
};
