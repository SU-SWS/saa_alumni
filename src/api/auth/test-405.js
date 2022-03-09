// TODO: DELETE BEFORE MERGING. THIS IS SOLELY FOR TESTING 405 ERROR HANDLING
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import { MegaProfile } from '../../utilities/MegaProfile';
import { authInstance } from '../../utilities/authInstance';
import {
  ExceptionHandler,
  NotFoundException,
} from '../../utilities/ApiExceptions';

const test405Handler = async (req, res) => {
  const mp = new MegaProfile();
  try {
    const { user } = req;
    const { data: contact } = await mp.post(
      `/${req.user.encodedSUID}/profiles/contact`
    );
    if (!contact) return NotFoundException(res);
    const mpUser = { user, contact };
    return res.status(200).json(mpUser);
  } catch (err) {
    return ExceptionHandler(res, err);
  }
};

const handler = connect().use(authInstance.authorize()).get(test405Handler);

export default handler;
