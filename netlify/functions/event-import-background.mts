import dotenv from 'dotenv';
import { Context, type Config } from '@netlify/functions';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import StoryblokClient from 'storyblok-js-client';
import { compareStoryContent, googleRowToStory } from '../../src/utilities/synchronizedEvents';

dotenv.config();

export default async (req: Request, context: Context) => {
  try {
    const { secret } = context.params ?? {};

    if (secret !== process.env.EVENT_IMPORT_SECRET) {
      throw new Error('Missing secret');
    }

    const spaceId = process.env.SPACE_ID ?? '';
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '';
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? '';
    const hivebrightSheetId = process.env.SHEET_ID_HIVEBRIGHT ?? '';
    const cventSheetId = process.env.SHEET_ID_CVENT ?? '';

    if (!email || !key || !spaceId || !hivebrightSheetId || !cventSheetId) {
      throw new Error('Missing required values');
    }

    const auth = new JWT({
      email,
      key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const googleStories: any[] = [];

    const hivebrightDoc = new GoogleSpreadsheet(hivebrightSheetId, auth);
    await hivebrightDoc.loadInfo();
    const hivebrightSheet = hivebrightDoc.sheetsByIndex[0];
    const hivebrightRows = await hivebrightSheet.getRows();
    
    hivebrightRows.forEach((row) => {
      googleStories.push(googleRowToStory(row.toObject(), 'Hivebright'));
    });

    const cventDoc = new GoogleSpreadsheet(cventSheetId, auth);
    await cventDoc.loadInfo();
    const cventSheet = cventDoc.sheetsByIndex[0];
    const cventRows = await cventSheet.getRows();
    
    cventRows.forEach((row) => {
      googleStories.push(googleRowToStory(row.toObject(), 'CVent'));
    });

    const storyblokContent = new StoryblokClient({
      accessToken: process.env.STORYBLOK_WEBHOOK_PREVIEW_ACCESS_TOKEN,
    });

    const storyblokManagement = new StoryblokClient({
      oauthToken: process.env.STORYBLOK_MANAGEMENT_OAUTH_TOKEN,
    });

    const sbPublishedEvents = await storyblokContent.getAll('cdn/stories/events/sync', { content_type: 'synchronizedEvent', level: 1 }) ?? [];
    const sbUnpublishedEvents = await storyblokContent.getAll('cdn/stories/events/sync', { content_type: 'synchronizedEvent', level: 1, version: 'draft' }) ?? [];
    const sbEvents = [...sbPublishedEvents?.map((s) => s.data.story), ...sbUnpublishedEvents?.map((s) => s.data.story)];

    const data = new Map();
    googleStories.forEach((event) => {
      data.set(event.externalId, { google: event, storyblok: undefined });
    });
    sbEvents.forEach((story) => {
      const storyId = story.uuid;
      const existing = data.get(storyId);

      const value = existing
        ? { ...existing, storyblok: story }
        : { google: undefined, storyblok: story }

      data.set(storyId, value);
    });
    data.forEach(async ({ google, storyblok }, id) => {
      if (!!google && !!storyblok) {
        // Compare and update as needed then publish
        if (!compareStoryContent(google.content, storyblok.content)) {
          return;
        }

        await storyblokManagement.put(`spaces/${spaceId}/stories/${storyblok.id}`, {
          story: google,
          publish: 1,
        });
      }

      if (!!google) {
        // Post to SB then publish
        await storyblokManagement.post(`/spaces/:space_id/stories/`, {
          story: google,
          publish: 1,
        })
      }

      if (!!storyblok) {
        // Unpublish
        await storyblokManagement.get(`spaces/${spaceId}/stories/${storyblok.id}/unpublish`);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const config: Config = {
  path: '/webhook/sb/event-import',
};
