import connect from 'next-connect';

import { generateAndroidWalletPassURL } from '../../utilities/walletPass';
import { authInstance } from '../../utilities/authInstance';
import { MegaProfile } from '../../utilities/MegaProfile';

const generatePass = async (req, res) => {
  try {
    const mp = new MegaProfile();
    let fullprofile = {};
    let memberships = [];

    const profileId = req.user.encodedSUID;

    const requests = [
      mp.get(`/${profileId}/profiles/fullprofile`),
      mp.get(`/${profileId}/profiles/memberships`),
    ];

    const resolved = await Promise.allSettled(requests);

    // Full GG Data.
    if (resolved[0].status === 'fulfilled' && !!resolved[0].value?.data) {
      fullprofile = resolved[0].value.data;
    } else {
      fullprofile.contact.name = {};
      fullprofile.contact.name.digitalName = `${req.user.firstName} ${req.user.lastName}`;
    }

    // Membership Data;
    if (resolved[1].status === 'fulfilled' && !!resolved[1].value?.data) {
      memberships = resolved[1].value.data.memberships;
    }

    const mpUser = {
      ...fullprofile,
      memberships,
    };

    const passUrl = await generateAndroidWalletPassURL(mpUser);

    if (passUrl) {
      res.status(200).send(passUrl);
    } else {
      res
        .status(500)
        .send(
          'Pass URL generation failed. Please try again or contact support.'
        );
    }
  } catch (error) {
    res
      .status(500)
      .send('Pass URL generation failed. Please try again or contact support.');
  }
};

export default connect().use(authInstance.authorize()).get(generatePass);
