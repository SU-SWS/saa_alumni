import connect from 'next-connect';
import { authInstance } from '../../utilities/authInstance';
import { sessionMockData } from '../../utilities/mocks/session';
import { isStoryblokEditor } from '../../utilities/isStoryblokEditor';

const handler = connect()
  // Pass-through for Storyblok Editor preview.
  .get(async (req, res, next) => {
    const isEditor = await isStoryblokEditor(req);
    if (isEditor) {
      res.json(sessionMockData);
    } else next();
  })
  .use(authInstance.authorize())
  .get((req, res) => {
    res.json(req.user);
  });

export default handler;
