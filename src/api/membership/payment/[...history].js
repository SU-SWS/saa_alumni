import { createRouter, expressWrapper } from 'next-connect';
import { GiveGabNonce } from '../../../utilities/givegab/GiveGabNonce';
import { authInstance } from '../../../utilities/authInstance';
import {
  fullprofileMockData,
  membershipsMockData,
} from '../../../utilities/mocks';
import { isStoryblokEditor } from '../../../utilities/isStoryblokEditor';

const paymentHandler = async (req, res) => {
  // Extract orgId and dssId from the URL parameters
  const { history } = req.params;
  const [orgId, dssId, scheduleId] = history.split('/');
  const ggNonce = new GiveGabNonce();

  try {
    // Use orgId and dssId to fetch the nonce token
    const nonceToken = await ggNonce.getToken(orgId, dssId, scheduleId);
    res.json({ ...nonceToken });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR:', err);
    res.status(404).json({ error: 'Nonce token not found' });
  }
};

const storyblokPreviewPassthrough = async (req, res, next) => {
  const isEditor = await isStoryblokEditor(req);
  if (isEditor) {
    res.json({ ...fullprofileMockData, ...membershipsMockData });
  } else next();
};

const router = createRouter()
  .get(storyblokPreviewPassthrough)
  .use(expressWrapper(authInstance.authorize()))
  .get(paymentHandler);

export default router.handler();
