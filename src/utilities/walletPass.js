const { PKPass } = require('passkit-generator');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const fetchUrlToBuffer = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (error) {
    console.error(`Failed to fetch URL: ${url}`, error);
    throw error;
  }
};

export const generateAppleWalletPass = async (megaProfileUser) => {
  try {
    const {
      contact: {
        name: { digitalName: memberName },
      },
      memberships: [{ membershipNumber, membershipStartDate }],
    } = megaProfileUser;

    const pass = new PKPass(
      {},
      {
        wwdr: process.env.APPLE_WWDR_CERTIFICATE,
        signerCert: process.env.PASS_SIGNING_CERTIFICATE,
        signerKey: process.env.PASS_SIGNING_CERTIFICATE_KEY,
        signerKeyPassphrase: process.env.PASS_CERTIFICATE_PASSWORD,
      },
      {
        backgroundColor: 'rgb(210, 7, 7)',
        description: 'Alumni Membership Card',
        foregroundColor: 'rgb(255, 255, 255)',
        formatVersion: 1,
        generic: {
          primaryFields: [],
          secondaryFields: [],
          auxiliaryFields: [],
        },
        labelColor: 'rgb(255, 255, 255)',
        logoText: 'Stanford Alumni Membership',
        organizationName: 'Stanford Alumni',
        passTypeIdentifier: process.env.PASS_TYPE_IDENTIFIER,
        serialNumber: membershipNumber,
        teamIdentifier: 'TV7YB5JDT2',
      }
    );

    pass.type = 'generic';

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

    const bufferIcon = await fetchUrlToBuffer(process.env.IOS_PASS_ICON_URL);
    pass.addBuffer('icon.png', bufferIcon);

    const bufferIcon2x = await fetchUrlToBuffer(
      process.env.IOS_PASS_ICON_2X_URL
    );
    pass.addBuffer('icon@2x.png', bufferIcon2x);

    const bufferLogo = await fetchUrlToBuffer(process.env.IOS_PASS_LOGO_URL);
    pass.addBuffer('logo.png', bufferLogo);

    const bufferLogo2x = await fetchUrlToBuffer(
      process.env.IOS_PASS_LOGO_2X_URL
    );
    pass.addBuffer('logo@2x.png', bufferLogo2x);

    const bufferThumbnail = await fetchUrlToBuffer(
      process.env.IOS_PASS_THUMBNAIL_URL
    );
    pass.addBuffer('thumbnail.png', bufferThumbnail);

    const bufferThumbnail2x = await fetchUrlToBuffer(
      process.env.IOS_PASS_THUMBNAIL_2X_URL
    );
    pass.addBuffer('thumbnail@2x.png', bufferThumbnail2x);

    const bufferThumbnail3x = await fetchUrlToBuffer(
      process.env.IOS_PASS_THUMBNAIL_3X_URL
    );
    pass.addBuffer('thumbnail@3x.png', bufferThumbnail3x);

    if (process.env.PASS_INCLUDE_QR_CODE === 'true') {
      pass.setBarcodes(membershipNumber);
    }

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
      },
      memberships: [{ membershipNumber, membershipStartDate }],
      emails: [{ emailAddress }],
    } = megaProfileUser;

    // Test with custom user information
    // const memberName = 'Moises Narvaez';
    // const emailAddress = 'moisesnarvaez+8532@gmail.com';

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
      hexBackgroundColor: '#d20707',
      logo: {
        sourceUri: {
          uri: process.env.ANDROID_PASS_LOGO_URL,
        },
      },
      cardTitle: {
        defaultValue: {
          language: 'en',
          value: 'Stanford Alumni Membership',
        },
      },
      subheader: {
        defaultValue: {
          language: 'en',
          value: 'Alumni Membership Card',
        },
      },
      header: {
        defaultValue: {
          language: 'en',
          value: memberName,
        },
      },
      heroImage: {
        sourceUri: {
          uri: process.env.ANDROID_PASS_IMAGE_URL,
        },
      },
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
      ],
    };

    if (process.env.ANDROID_PASS_INCLUDE_QR_CODE === 'true') {
      genericObject.barcode = {
        type: 'QR_CODE',
        value: `${membershipNumber}`,
      };
    }

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
