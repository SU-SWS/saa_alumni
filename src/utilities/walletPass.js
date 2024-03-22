const { PKPass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

export const generateAplleWalletPass = async (
  membershipNumber,
  firstName,
  lastName
) => {
  const passModelDirectory = '../../saacard.pass';

  const pass = await PKPass.from(
    {
      model: passModelDirectory,
      certificates: {
        wwdr: process.env.PASS_CERTIFICATE_PASSWORD,
        signerCert: process.env.PASS_SIGNING_CERTIFICATE,
        signerKey: process.env.PASS_SIGNING_CERTIFICATE_KEY,
        signerKeyPassphrase: process.env.PASS_CERTIFICATE_PASSWORD,
      },
    },
    {
      serialNumber: membershipNumber,
      generic: {
        primaryFields: [
          {
            key: 'memberName',
            label: 'Member Name',
            value: `${firstName} ${lastName}`,
          },
        ],
      },
    }
  );

  // Add necessary images (modify as needed)
  pass.images.icon = fs.readFileSync(path.join(passModelDirectory, 'icon.png'));
  pass.images.logo = fs.readFileSync(path.join(passModelDirectory, 'logo.png'));
  const backgroundPath = path.join(passModelDirectory, 'background.png');
  pass.addBuffer('background.png', fs.readFileSync(backgroundPath));

  // Generate the pass and collect the generated data into a buffer
  const stream = await pass.getAsStream();
  const buffers = await Array.from(stream, (chunk) => chunk);

  return Buffer.concat(buffers);
};
