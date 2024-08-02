import { createRouter, expressWrapper } from 'next-connect';
import URLParse from 'url-parse';
import { authInstance } from '../../utilities/authInstance';

const router = createRouter()
  .use(expressWrapper(authInstance.initiate()))
  // Return user to page they were previously on after logging in.
  .get((req, res, next) => {
    if (!req.query.final_destination) {
      const { referer } = req.headers;
      const { pathname } = URLParse(referer);
      req.query.final_destination = pathname || '/';
    }
    next();
  });

export default router.handler();
