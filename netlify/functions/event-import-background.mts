import dotenv from 'dotenv';
import { Context, type Config } from '@netlify/functions';
import { GoogleSpreadsheet, type GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import StoryblokClient from 'storyblok-js-client';

dotenv.config();

export default async (req: Request, context: Context) => {
  const { secret } = context.params ?? {};

  if (secret !== process.env.EVENT_IMPORT_SECRET) {
    return;
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '';
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? '';
  const sheetId = process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? '';

  const auth = new JWT({
    email,
    key,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const doc = new GoogleSpreadsheet(sheetId, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const googleEvents: any[] = [];

  const storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_MANAGEMENT_OAUTH_TOKEN,
  });

  const sbPublishedEvents = await storyblok.getAll('cdn/stories/events/sync', { content_type: 'synchronizedEvent', level: 1 });
  const sbUnpublishedEvents = await storyblok.getAll('cdn/stories/events/sync', { content_type: 'synchronizedEvent', level: 1, version: 'draft' });
  const sbEvents = [...sbPublishedEvents, ...sbUnpublishedEvents];

  const data = new Map();
  googleEvents.forEach((event) => {
    data.set(event.externalId, { google: event, storyblok: undefined });
  });
  sbEvents.forEach((story) => {
    const storyId = story.data.story.uuid;
    const existing = data.get(storyId);

    const value = existing
      ? { ...existing, storyblok: story }
      : { google: undefined, storyblok: story }

    data.set(storyId, value);
  });
  data.forEach(({ google, storyblok }, id) => {
    if (!!google && !!storyblok) {
      // Compare and update as needed then publish
    }

    if (!!google) {
      // Push to SB then publish
    }

    if (!!storyblok) {
      // Unpublish then move
    }
  });
};

export const config: Config = {
  path: '/webhook/sb/event-import',
};
