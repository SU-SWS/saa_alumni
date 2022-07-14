import connect from 'next-connect';
import URLParse from 'url-parse';
import { authInstance } from '../../utilities/authInstance';

const handler = connect()
  // Return user to page they were previously on after logging in.
  .use((req, res, next) => {
    const { referer } = req.headers;
    const { query, pathname } = URLParse(referer);
    if (!req.query.final_destination) {
      req.query.final_destination = pathname || '/';
    }
    if (query.includes('utm') || query.includes('olc')) {
      const urlParams = pathname + query;
      req.query.final_destination = urlParams;
    }
    next();
  })
  .use(authInstance.initiate());

export default handler;
