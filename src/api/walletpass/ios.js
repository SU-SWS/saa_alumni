import { createRouter, expressWrapper } from 'next-connect';

import path from 'path';
import { generateAppleWalletPass } from '../../utilities/walletPass';
import { authInstance } from '../../utilities/authInstance';
import { MegaProfile } from '../../utilities/MegaProfile';

const generatePkPass = async (req, res) => {
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
    const passModelDirectory = process.env.NETLIFY
      ? path.resolve(__dirname, './saacard.pass')
      : path.resolve('src/api/walletpass/saacard.pass');
    const pkpass = await generateAppleWalletPass(mpUser, passModelDirectory);
    const buffer = pkpass.getAsBuffer();

    if (pkpass) {
      res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="pass.pkpass"'
      );
      res.status(200).send(buffer);
    } else {
      res
        .status(500)
        .send(
          'Pass URL generation failed. Please try again or contact support.'
        );
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send('Passkit generation failed. Please try again or contact support.');
  }
};

const router = createRouter()
  .use(expressWrapper(authInstance.authorize()))
  .get(generatePkPass);

export default router.handler();
