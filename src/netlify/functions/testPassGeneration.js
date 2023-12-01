// Netlify Function for generating a pass
const { Pass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  console.log("Received event:", event);
  if (event.httpMethod !== 'POST') {
    console.log("Invalid HTTP method");
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { membershipNumber, firstName, lastName } = JSON.parse(event.body);
    console.log("Received data:", membershipNumber, firstName, lastName);

    const passJsonPath = path.join(__dirname, '..', '..', 'stanford.pass', 'pass.json');
    const template = fs.readFileSync(passJsonPath, 'utf8');
    const passData = JSON.parse(template);

    passData.serialNumber = membershipNumber;
    passData.barcode.message = membershipNumber;
    passData.coupon.primaryFields[0].value = `${firstName} ${lastName}`;

    const pass = new Pass({
      model: passData,
      certificates: {
        wwdr: process.env.APPLE_WWDR_CERTIFICATE_PATH,
        signerCert: process.env.PASS_SIGNING_CERTIFICATE_PATH,
        signerKey: {
          keyFile: process.env.PASS_SIGNING_CERTIFICATE_PATH,
          passphrase: process.env.PASS_CERTIFICATE_PASSWORD,
        },
      },
    });

    pass.images.icon = fs.readFileSync(path.join(__dirname, '..', '..', 'stanford.pass', 'icon.png'));

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
    console.error("Error generating pass:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' }),
    };
  }
};
