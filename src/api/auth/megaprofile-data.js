// Get A User Data. Delete this prior to merging branch into TSGG
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/megaprofile-test
// -----------------------------------------------------------------------------
import connect from 'next-connect';
import { MegaProfile } from '../../utilities/MegaProfile';
import { authInstance } from '../../utilities/authInstance';

const megaprofileHandler = async (req, res) => {
  const mp = new MegaProfile();
  try {
    console.log('req.user: ', req.user);
    const { contact } = await mp.get(
      // `${req.user.encodedSUID}/profiles/contact`
      `66530456105/profiles/contact`
    );
    console.log('contact: ', contact);
    res.status(200).json(contact);
    // res.status(200).json({ message: 'test' });
    // TODO: Once we have the user data, we can append the megaprofile data.
    // const { addresses } = await mp.get(`${user.encodedSUID}/profiles/addresses`);
    // const { emails } = await mp.get(`${user.encodedSUID}/profiles/emails`);
    // const { phoneNumbers } = await mp.get(`${user.encodedSUID}/profiles/phonenumbers`);
    // const newUser = { ...user, contact, addresses, emails, phoneNumbers };
    // res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json(e.response.data);
  }
};

const handler = connect().use(authInstance.authorize()).get(megaprofileHandler);

export default handler;
