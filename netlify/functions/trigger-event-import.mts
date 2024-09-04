import dotenv from 'dotenv';
import { type Config } from '@netlify/functions';

dotenv.config();

export default async (req: Request) => {
  try {
    const secret = process.env.EVENT_IMPORT_SECRET ?? '';
    console.log('=== START Trigger Event Import ===');

    if (!secret) {
      throw new Error('No secret available');
    }

    const url = new URL('webhook/sb/event-import', req.url);
    url.searchParams.set('secret', secret);

    const triggerRes = await fetch(url, { method: 'POST' });

    if (triggerRes.ok) {
      console.log('Success!');
    } else {
      console.error('Unsuccessful response: ', triggerRes.status);
      console.error(triggerRes.statusText);
    }
  } catch (err) {
    console.error('Error during request: ', err);
  }

  console.log('=== END Trigger Event Import ===');
  return Response.json({ statusCode: 200 });
};

export const config: Config = {
  schedule: '30 15 * * *', // Every day at 3:30 PM UTC (7:30 PST/8:30 PDT)
};
