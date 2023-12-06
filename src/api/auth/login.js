import connect from 'next-connect';
import URLParse from 'url-parse';
import { authInstance } from '../../utilities/authInstance';

const handler = connect()
  .use(authInstance.initiate())
  // Return user to page they were previously on after logging in.
  .get((req, res, next) => {
    if (!req.query.final_destination) {
      const { referer } = req.headers;
      const { pathname } = URLParse(referer);
      req.query.final_destination = pathname || '/';
    }
    next();
  });

export default handler;
