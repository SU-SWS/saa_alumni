import { type Config } from '@netlify/functions';
import StoryblokClient from 'storyblok-js-client';
import algoliasearch from 'algoliasearch';
import { type SBWebhookPayload } from '../../src/types/storyblok/api/SBWebhookType';

export default async (req: Request) => {
  console.log('=== START Deploy Background Function ===');
  const signature = req.headers['webhook-signature'] ?? '';
  const deployUrl = process.env.DEPLOY_HOOK_URL ?? '';
  const algoliaWriteKey = process.env.ALGOLIA_EVENTS_WRITE_KEY ?? '';
  const algoliaAppId = process.env.GATSBY_ALGOLIA_APP_ID ?? '';
  const algoliaIndex = process.env.ALGOLIA_EVENTS_INDEX_NAME ?? '';

  console.log({ sig: req.headers['webhook-signature'], signature });

  try {
    if (!signature) {
      throw new Error('No signature');
    }

    if (signature !== process.env.SECRET) {
      throw new Error('Wrong signature');
    }

    if (!deployUrl) {
      throw new Error('Missing deploy info');
    }

    const data: SBWebhookPayload = await req.json();
    
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
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    });

    const story = await storyblok.getStory(data.full_slug);
    const contentType = story.data.story.content.component;
    const isEvent = contentType === 'synchronizedEvent';

    if (!isEvent) {
      // Trigger rebuild and stop
      await fetch(deployUrl, { method: 'POST' });
      console.log('Deploy triggered');
      console.log('=== END Deploy Background Function ===');
      return;
    }

    // Only pub/unpub actions for alumni events

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
        objectId: storyId,
        ...eventData,
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

// export const config: Config = {
//   path: '/api-test/handle-deploy',
// };
