import dotenv from 'dotenv';
import { type Config } from '@netlify/functions';

dotenv.config();

export default async (req: Request) => {
  const secret = process.env.EVENT_IMPORT_SECRET ?? '';
  console.log('=== START Trigger Event Import ===');

  if (!secret) {
    console.error('No secret available');
    return Response.json({ statusCode: 200 });
  }

  const url = new URL('/webhook/sb/import-events', req.url);
  url.searchParams.set('secret', secret);

  try {
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
};

export const config: Config = {
  schedule: '0 15 * * *', // Every day at 3 PM UTC (8 AM PT)
};
