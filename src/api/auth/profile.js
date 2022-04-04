// Get MP User Data and append to Auth User Data
// Do not enable for public use. This is for development/debugging purposes only.
// Data can be viewed at /api/auth/profile
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
    const { data: addresses } = await mp.get(
      `${req.user.encodedSUID}/profiles/addresses`
    );
    const { data: emails } = await mp.get(
      `${req.user.encodedSUID}/profiles/emails`
    );
    const { data: phoneNumbers } = await mp.get(
      `${req.user.encodedSUID}/profiles/phonenumbers`
    );
    let { data: relationships } = await mp.get(
      `${req.user.encodedSUID}/profiles/relationships`
    );

    if (relationships.length === 0) {
      relationships = {
        relationships: [
          {
            id: '4e98cb4e-77e5-491a-9786-11ddd20ee4b2',
            type: 'Spouse/Partner',
            digitalName: 'Max Dataton',
            birthDate: '2015-02-10',
          },
          {
            id: '62364aca-1e2c-47f5-9cc2-d83986a5edfe',
            type: 'Child',
            digitalName: 'Asha Yost',
            birthDate: '1998-01-02',
          },
          {
            id: 'af1104c0-c373-427b-b564-87ed991af420',
            type: 'Child',
            digitalName: 'Dino Okuneva',
            birthDate: '1936-07-27',
          },
          {
            id: '9ad905be-79cf-4faf-b2bb-c944aa9e6f87',
            type: 'Child',
            digitalName: 'Lou Beier',
            birthDate: '2005-04-14',
          },
          {
            id: '1014caad-8e28-4508-b2a0-0ad7f3cf4cf2',
            type: 'Child',
            digitalName: 'Alessia Jacobi',
            birthDate: '1971-04-19',
          },
          {
            id: 'd0a82cf2-9271-4e68-801f-755a3f2fee00',
            type: 'Child',
            digitalName: 'Michael Rotkowitz',
            birthDate: '2006-02-17',
          },
        ],
      };
    }

    const mpUser = {
      user,
      contact,
      addresses,
      emails,
      phoneNumbers,
      relationships,
    };
    return res.status(200).json(mpUser);
  } catch (err) {
    return ExceptionHandler(res, err);
  }
};

const handler = connect().use(authInstance.authorize()).get(megaprofileHandler);

export default handler;
