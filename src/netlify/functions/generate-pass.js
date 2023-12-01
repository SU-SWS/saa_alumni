// src/netlify/functions/generate-pass.js
const { Pass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  console.log('Received event:', event);
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { membershipNumber, firstName, lastName } = JSON.parse(event.body);

    // Corrected file path
    const passJsonPath = path.join(__dirname, '..', '..', 'stanford.pass', 'pass.json');
    const passData = JSON.parse(fs.readFileSync(passJsonPath, 'utf8'));

    // Initialize a pass
    const pass = new Pass({
      model: passData,
      certificates: {
        wwdr: fs.readFileSync(process.env.APPLE_WWDR_CERTIFICATE_PATH),
        signerCert: fs.readFileSync(process.env.PASS_SIGNING_CERTIFICATE_PATH),
        signerKey: {
          keyFile: fs.readFileSync(process.env.PASS_SIGNING_CERTIFICATE_PATH),
          passphrase: process.env.PASS_CERTIFICATE_PASSWORD,
        },
      },
    });

    // Set pass properties
    pass.serialNumber = membershipNumber;
    pass.barcodes = [{
      message: membershipNumber,
      format: "PKBarcodeFormatQR",
      messageEncoding: "iso-8859-1"
    }];
    pass.primaryFields = [{
      key: 'name',
      label: 'Member',
      value: `${firstName} ${lastName}`
    }];

    // Add icon file to the pass
    const iconPath = path.join(__dirname, '..', '..', 'stanford.pass', 'icon.png');
    pass.images.icon = fs.readFileSync(iconPath);

    // Generate the pass and capture the output stream
    const stream = pass.generate();
    const buffers = [];
    for await (const chunk of stream) {
      buffers.push(chunk);
    }
    const passBuffer = Buffer.concat(buffers);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': 'attachment; filename="pass.pkpass"'
      },
      body: passBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error generating the pass:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' }),
    };
  }
};
