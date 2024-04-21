const { PKPass } = require('passkit-generator');
const path = require('path');
const jwt = require('jsonwebtoken');

export const generateAppleWalletPass = async (megaProfileUser) => {
  try {
    const passModelDirectory = '../../../src/utilities/saacard.pass';
    const {
      contact: {
        name: { digitalName: memberName },
        birthDate,
      },
      memberships: [{ membershipNumber, membershipStartDate }],
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

export const generateAndroidWalletPassURL = async (megaProfileUser) => {
  try {
    const {
      contact: {
        name: { digitalName: memberName },
        birthDate,
      },
      memberships: [{ membershipNumber, membershipStartDate }],
      emails: [{ emailAddress }],
    } = megaProfileUser;

    const issuerId = process.env.ANDROID_PASS_ISSUER_ID;
    const classId = `${issuerId}.stanford-alumni-pass`;
    const credentials = {
      type: 'service_account',
      project_id: process.env.ANDROID_PASS_PROJECT_ID,
      private_key_id: process.env.ANDROID_PASS_PRIVATE_KEY_ID,
      private_key: process.env.ANDROID_PASS_PRIVATE_KEY,
      client_email: process.env.ANDROID_PASS_CLIENT_EMAIL,
      client_id: process.env.ANDROID_PASS_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/stanford-pass-dev%40oceanic-spider-420801.iam.gserviceaccount.com',
      universe_domain: 'googleapis.com',
    };

    const objectSuffix = `${emailAddress.replace(/[^\w.-]/g, '_')}`;
    const objectId = `${issuerId}.${objectSuffix}`;

    const genericObject = {
      id: `${objectId}`,
      classId,
      genericType: 'GENERIC_TYPE_UNSPECIFIED',
      hexBackgroundColor: '#8c1515',
      logo: {
        sourceUri: {
          // TODO: Use a square logo image, in a public URL
          uri: 'http://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/SU_New_BlockStree_2color_darkbgrd.png',
        },
      },
      cardTitle: {
        defaultValue: {
          language: 'en',
          value: 'Stanford Alumni Member',
        },
      },
      subheader: {
        defaultValue: {
          language: 'en',
          value: 'Member',
        },
      },
      header: {
        defaultValue: {
          language: 'en',
          value: memberName,
        },
      },
      // In case we want to include a bar or QR code
      // barcode: {
      //   type: 'QR_CODE',
      //   value: `${objectId}`,
      // },
      // In case we want to include a hero/footer image. It requires a public image URL
      // heroImage: {
      //   sourceUri: {
      //     uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.jpg',
      //   },
      // },
      textModulesData: [
        {
          header: 'NAME',
          body: memberName,
          id: 'memberName',
        },
        {
          header: 'NUMBER',
          body: membershipNumber,
          id: 'membershipNumber',
        },
        {
          header: 'SINCE',
          body: membershipStartDate,
          id: 'memberSince',
        },
        {
          header: 'EMAIL',
          body: emailAddress,
          id: 'emailAddress',
        },
        {
          header: 'BIRTHDATE',
          body: birthDate,
          id: 'birthDate',
        },
      ],
    };

    const claims = {
      iss: credentials.client_email,
      aud: 'google',
      origins: [],
      typ: 'savetowallet',
      payload: {
        genericObjects: [genericObject],
      },
    };

    const token = jwt.sign(claims, credentials.private_key, {
      algorithm: 'RS256',
    });
    return `https://pay.google.com/gp/v/save/${token}`;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating Google Pass URL:', error);
    return null;
  }
};
