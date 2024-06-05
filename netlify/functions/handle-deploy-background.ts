import dotenv from 'dotenv';
import { type Config } from '@netlify/functions';
import { createHmac } from 'node:crypto';
import StoryblokClient from 'storyblok-js-client';
import algoliasearch from 'algoliasearch';
import { type SBWebhookPayload } from '../../src/types/storyblok/api/SBWebhookType';
import { mergeEventOverrides } from '../../src/utilities/mergeEventOverrides';

dotenv.config();

export default async (req: Request) => {
  console.log('=== START Deploy Background Function ===');

  try {
    const signature = req.headers.get('webhook-signature') ?? '';
    const webhookSecret = process.env.STORYBLOK_WEBHOOK_SECRET ?? '';
    const deployUrl = process.env.DEPLOY_HOOK_URL ?? '';

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
    
    if (data.action === 'entries_updated'
      || data.action === 'merged'
      || data.action === 'deleted'
    ) {
      // Trigger rebuild and stop
      await fetch(deployUrl, { method: 'POST' });
      console.log('Deploy triggered');
      console.log('=== END Deploy Background Function ===');
      return;
    }

    // Only pub/unpub actions after this

    const storyblok = new StoryblokClient({
      accessToken: process.env.STORYBLOK_WEBHOOK_PREVIEW_ACCESS_TOKEN,
    });

    const version = data.action === 'unpublished' ? 'draft' : 'published';
    const story = await storyblok.getStory(data.full_slug, { version });
    const contentType = story.data.story.content.component;
    const isEvent = contentType === 'synchronizedEvent';

    if (!isEvent) {
      // Trigger rebuild and stop
      await fetch(deployUrl, { method: 'POST' });
      console.log('Deploy triggered');
      console.log('=== END Deploy Background Function ===');
      return;
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
    const storyId = story.data.story.uuid;
    const eventData = story.data.story.content;

    if (data.action === 'published') {
      // Upsert to Algolia (no rebuild)
      await index.saveObject({
        objectID: storyId,
        ...mergeEventOverrides(eventData),
      })
      console.log('Algolia upsert: ', storyId);
      console.log('=== END Deploy Background Function ===');
      return;
    }

    if (data.action === 'unpublished') {
      // Delete from algolia (no rebuild)
      await index.deleteObject(storyId);
      console.log('Algolia delete: ', storyId);
      console.log('=== END Deploy Background Function ===');
      return;
    }
    
  } catch (err) {
    console.error('Error during deploy function: ', err);
  }

  console.log('=== END Deploy Background Function ===');
};

export const config: Config = {
  path: '/webhook/sb/deploy',
};
