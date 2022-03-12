// Get MP User Data and append to User
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/auth/megaprofile-data
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import { MegaProfile } from '../../utilities/MegaProfile';
import { authInstance } from '../../utilities/authInstance';
import { ExceptionHandler } from '../../utilities/ApiExceptions';

const megaprofileHandler = async (req, res) => {
  const mp = new MegaProfile();
  try {
    const { user } = req;
    const { data: contact } = await mp.get(
      `/${req.user.encodedSUID}/profiles/contact`
    );
    const { addresses } = await mp.get(
      `${req.user.encodedSUID}/profiles/addresses`
    );
    const { emails } = await mp.get(`${req.user.encodedSUID}/profiles/emails`);
    const { phoneNumbers } = await mp.get(
      `${req.user.encodedSUID}/profiles/phonenumbers`
    );
    const mpUser = { user, contact, addresses, emails, phoneNumbers };
    return res.status(200).json(mpUser);
  } catch (err) {
    return ExceptionHandler(res, err);
  }
};

const handler = connect().use(authInstance.authorize()).get(megaprofileHandler);

export default handler;
