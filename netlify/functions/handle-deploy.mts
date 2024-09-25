import dotenv from 'dotenv';
import { type Config } from '@netlify/functions';
import { createHmac } from 'node:crypto';
import StoryblokClient, { ISbStories } from 'storyblok-js-client';
import algoliasearch from 'algoliasearch';
import { type SBWebhookPayload } from '../../src/types/storyblok/api/SBWebhookType';
import { storyToAlgoliaEvent } from '../../src/utilities/synchronizedEvents';

dotenv.config();

export default async (req: Request) => {
  console.log('=== START Deploy Background Function ===');

  try {
    const signature = req.headers.get('webhook-signature') ?? '';
    const webhookSecret = process.env.STORYBLOK_WEBHOOK_SECRET ?? '';
    const deployUrl = process.env.DEPLOY_HOOK_URL ?? '';
    const regionsDatasourceId =  process.env.EVENT_DATASOURCE_REGIONS_ID ?? '';
    const regionsDatasourceDimensionId =  process.env.EVENT_DATASOURCE_REGIONS_DIMENSION_ID ?? '';
    const mode = process.env.DEPLOY_MODE ?? 'stop';

    if (mode === 'stop') {
      throw new Error('Deploy mode set to "stop"');
    }

    const run = mode === 'run';
    console.log(`Running in ${mode} mode`);

    if (!signature) {
      throw new Error('No signature');
    }

    if (!deployUrl) {
      throw new Error('Missing deploy info');
    }

    const rawData = await req.text();

    if (!rawData) {
      throw new Error('No payload');
    }

    const generatedSignature = createHmac('sha1', webhookSecret).update(rawData).digest('hex');
  
    if (signature !== generatedSignature) {
      throw new Error('Wrong signature');
    }

    const data: SBWebhookPayload = await JSON.parse(rawData);
    console.log(data);
    
    if (data.action !== 'published' && data.action !== 'unpublished') {
      // Trigger rebuild and stop
      console.log('Non publish event detected. Deploying...');
      if (run) {
        await fetch(deployUrl, { method: 'POST' });
      }
      console.log('Deploy triggered');
      console.log('=== END Deploy Background Function ===');
      return new Response('Accepted', { status: 202 });
    }

    // Only pub/unpub actions after this

    const storyblokContent = new StoryblokClient({
      accessToken: process.env.STORYBLOK_WEBHOOK_PREVIEW_ACCESS_TOKEN,
    });

    const storyblokManagement = new StoryblokClient({
      oauthToken: process.env.STORYBLOK_MANAGEMENT_OAUTH_TOKEN,
    });

    const storyRes = await storyblokManagement.get(`/spaces/${data.space_id}/stories/${data.story_id}`);
    const story = storyRes?.data?.story;
    const isFolder = story?.is_folder;
    const contentType = story?.content?.component;
    const isEvent = contentType === 'synchronizedEvent';
    const isEventFolder = isFolder && data.full_slug === 'events' || data.full_slug === 'events/sync';

    if ((isFolder || !isEvent) && !isEventFolder) {
      // Trigger rebuild and stop
      console.log('(Un)publish event detected. Deploying...');
      if (run) {
        await fetch(deployUrl, { method: 'POST' });
      }
      console.log('Deploy triggered');
      console.log('=== END Deploy Background Function ===');
      return new Response('Accepted', { status: 202 });
    }

    // Only pub/unpub actions for alumni events after this

    const algoliaWriteKey = process.env.ALGOLIA_EVENTS_WRITE_KEY ?? '';
    const algoliaAppId = process.env.GATSBY_ALGOLIA_APP_ID ?? '';
    const algoliaIndex = process.env.ALGOLIA_EVENTS_INDEX_NAME ?? '';

    if (!algoliaAppId || !algoliaWriteKey || !algoliaIndex) {
      throw new Error('Missing Algolia API info');
    }

    const client = algoliasearch(
      algoliaAppId,
      algoliaWriteKey,
    );
    const index = client.initIndex(algoliaIndex);
    let storiesToProcess = [story];

    if (isEventFolder) {
      storiesToProcess = await storyblokContent.getAll('cdn/stories', { 
        starts_with: 'events/sync/', 
        content_type: 'synchronizedEvent', 
        version: data.action === 'published' ? 'published' : 'draft', 
      }) ?? [];

      storiesToProcess = storiesToProcess.filter((story) => story.full_slug.startsWith('events/sync/'));

      console.log('Event folder (un)publish event detected. Deploying...');
      if (run) {
        await fetch(deployUrl, { method: 'POST' });
      }
      console.log('Deploy triggered');
    }

    const regions = await storyblokManagement.getAll(`/spaces/${data.space_id}/datasource_entries`, {
      datasource_id: regionsDatasourceId,
      dimension: regionsDatasourceDimensionId,
    } as any);

    await Promise.allSettled(storiesToProcess.map(async (story) => {
      try {
        if (data.action === 'published') {
          // Upsert to Algolia (no rebuild)
          console.log(`Upserting ${story.uuid} to algolia...`);
          const algoliaEvent = storyToAlgoliaEvent(story, regions);
          if (run) {
            await index.saveObject(algoliaEvent);
          }
          console.log('Algolia upsert: ', story.uuid);
        }
    
        if (data.action === 'unpublished') {
          // Delete from algolia (no rebuild)
          console.log(`Deleting ${story.uuid} from algolia...`);
          if (run) {
            await index.deleteObject(story.uuid);
          }
          console.log('Algolia delete: ', story.uuid);
        }
      } catch (err) {
        console.log(`Error handling ${story.uuid}: `, err);
      }
    }));
  } catch (err) {
    console.error('Error during deploy function: ', err);
  }

  console.log('=== END Deploy Background Function ===');
  return new Response('Accepted', { status: 202 });
};

export const config: Config = {
  path: '/webhook/sb/deploy',
};
