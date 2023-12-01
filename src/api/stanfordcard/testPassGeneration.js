// Netlify Function for generating a pass
const { Pass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
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
    const template = fs.readFileSync(passJsonPath, 'utf8');
    const passData = JSON.parse(template);

    // Update pass data with dynamic values
    passData.serialNumber = membershipNumber;
    passData.barcode.message = membershipNumber;
    passData.coupon.primaryFields[0].value = `${firstName} ${lastName}`;

    // Generate pass
    const pass = new Pass({
      model: passData,
      // Correct the paths to your certificates and keys
      certificates: {
        wwdr: process.env.APPLE_WWDR_CERTIFICATE_PATH,
        signerCert: process.env.PASS_SIGNING_CERTIFICATE_PATH,
        signerKey: {
          keyFile: process.env.PASS_SIGNING_CERTIFICATE_PATH,
          passphrase: process.env.PASS_CERTIFICATE_PASSWORD,
        },
      },
    });

    // Add files to pass
    pass.images.icon = fs.readFileSync(path.join(__dirname, '..', '..', 'stanford.pass', 'icon.png'));

    // Generate and send pass
    const stream = pass.generate();
    const buffers = [];
    for await (const chunk of stream) {
      buffers.push(chunk);
    }
    const passBuffer = Buffer.concat(buffers);

    return {
      statusCode: 200,
      headers: { 'Content-type': 'application/vnd.apple.pkpass' },
      body: passBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' }),
    };
  }
};
