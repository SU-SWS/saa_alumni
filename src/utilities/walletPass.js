const { PKPass } = require('passkit-generator');
const path = require('path');

// walletPass.js
export const generateAppleWalletPass = async (megaProfileUser) => {
  try {
    const passModelDirectory = '../../../src/utilities/saacard.pass';
    const {
      contact: {
        name: { digitalName: memberName },
        birthDate,
      },
      memberships: [{ membershipNumber, membershipStartDate, membershipType }],
      emails: [{ emailAddress }],
    } = megaProfileUser;

    const pass = await PKPass.from(
      {
        model: path.resolve(__dirname, passModelDirectory),
        certificates: {
          wwdr: process.env.APPLE_WWDR_CERTIFICATE,
          signerCert: process.env.PASS_SIGNING_CERTIFICATE,
          signerKey: process.env.PASS_SIGNING_CERTIFICATE_KEY,
          signerKeyPassphrase: 'test', // This is valid, process.env.PASS_CERTIFICATE_PASSWORD has an invalid value
        },
      },
      {
        serialNumber: membershipNumber,
      }
    );
    // Primary Fields
    pass.primaryFields.push({
      key: 'memberName',
      label: 'NAME',
      value: memberName,
    });

    // Secondary Fields
    pass.secondaryFields.push({
      key: 'membershipNumber',
      label: 'NUMBER',
      value: membershipNumber,
    });
    pass.secondaryFields.push({
      key: 'memberSince',
      label: 'SINCE',
      value: membershipStartDate,
    });
    // pass.secondaryFields.push({
    //   key: 'membershipType',
    //   label: 'TYPE',
    //   value: membershipType,
    // });

    // Auxiliary Fields
    pass.auxiliaryFields.push({
      key: 'emailAddress',
      label: 'EMAIL',
      value: emailAddress,
    });
    pass.auxiliaryFields.push({
      key: 'birthDate',
      label: 'BIRTHDATE',
      value: birthDate,
    });

    return pass;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating Apple Wallet Pass:', error);
    return null;
  }
};
