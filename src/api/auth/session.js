import { createRouter, expressWrapper } from 'next-connect';
import { authInstance } from '../../utilities/authInstance';
import { sessionMockData } from '../../utilities/mocks/session';
import { isStoryblokEditor } from '../../utilities/isStoryblokEditor';

const router = createRouter()
  // Pass-through for Storyblok Editor preview.
  .get(async (req, res, next) => {
    const isEditor = await isStoryblokEditor(req);
    if (isEditor) {
      res.json(sessionMockData);
    } else next();
  })
  .use(expressWrapper(authInstance.authorize()))
  .get((req, res) => {
    res.json(req.user);
  });

export default router.handler();
