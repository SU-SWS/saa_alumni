// This file is just to monitor that functions are working.
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter().get((req, res) => {
  res.statusCode = 200;
  res.end('Ok');
});

export default router.handler();
