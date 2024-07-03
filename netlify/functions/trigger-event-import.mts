import dotenv from 'dotenv';
import { type Config } from '@netlify/functions';

dotenv.config();

export default async (req: Request) => {
  try {
    const secret = process.env.EVENT_IMPORT_SECRET ?? '';
    console.log('=== START Trigger Event Import ===');

    // Make sure we only run this in production
    if (process.env.CONTEXT !== 'production') {
      throw new Error('Not in prod');
    }

    if (!secret) {
      throw new Error('No secret available');
    }

    const url = new URL('/webhook/sb/import-events', req.url);
    url.searchParams.set('secret', secret);

  
    const triggerRes = await fetch(url, { method: 'POST' });

    if (triggerRes.ok) {
      console.log('Success!');
    } else {
      console.error('Unsuccessful response: ', triggerRes.status);
      console.error(triggerRes.statusText);
    }
  } catch (err) {
    console.error('Error duing request: ', err);
  }

  console.log('=== END Trigger Event Import ===');
  return Response.json({ statusCode: 200 });
};

export const config: Config = {
  schedule: '0 15 * * *', // Every day at 3 PM UTC (8 AM PT)
};
