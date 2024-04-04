const { PKPass } = require('passkit-generator');
const path = require('path');

export const generateAplleWalletPass = async (megaProfileUser) => {
  const passModelDirectory = '../../../src/utilities/saacard.pass';

  // TODO: Overwrite the pass data with the user's data.
  console.log(megaProfileUser);
  const pass = await PKPass.from(
    {
      model: path.resolve(__dirname, passModelDirectory),
      certificates: {
        wwdr: process.env.APPLE_WWDR_CERTIFICATE,
        signerCert: process.env.PASS_SIGNING_CERTIFICATE,
        signerKey: process.env.PASS_SIGNING_CERTIFICATE_KEY,
        signerKeyPassphrase: 'test', // process.env.PASS_CERTIFICATE_PASSWORD,
      },
    }
    // {
    //   serialNumber: membershipNumber,
    //   generic: {
    //     primaryFields: [
    //       {
    //         key: 'memberName',
    //         label: 'Member Name',
    //         value: `${firstName} ${lastName}`,
    //       },
    //     ],
    //   },
    // }
  );
  const buffer = pass.getAsBuffer();

  return buffer;
};
