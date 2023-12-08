// src/netlify/functions/generate-pass.js
const { Pass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Log the entire event object and HTTP method
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('HTTP Method:', event.httpMethod);

  if (event.httpMethod !== 'POST') {
    console.log("Method not allowed. Received:", event.httpMethod);
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Debugging: Environment variables
  console.log('Environment Variables:');
  console.log('WWDR Path:', process.env.APPLE_WWDR_CERTIFICATE_PATH);
  console.log('Certificate Path:', process.env.PASS_SIGNING_CERTIFICATE_PATH);
  console.log('Certificate Password:', process.env.PASS_CERTIFICATE_PASSWORD);

  try {
    // Ensure the event body exists and log it
    if (!event.body) {
      throw new Error("No body in the request");
    }
    console.log('Event Body:', event.body);

    const { membershipNumber, firstName, lastName } = JSON.parse(event.body);
    console.log('Parsed Data:', { membershipNumber, firstName, lastName });


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

    // Debugging: Pass properties
    console.log('Pass Properties:', pass.serialNumber, pass.barcodes, pass.primaryFields);

    // Add icon file to the pass
    const iconPath = path.join(__dirname, '..', '..', 'stanford.pass', 'icon.png');
    console.log('Icon Path:', iconPath); // Debugging: Icon path
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
    console.error('Error processing the request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error', details: error.toString() }),
    };
  }
};