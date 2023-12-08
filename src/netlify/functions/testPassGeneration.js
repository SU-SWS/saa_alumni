// testPassGeneration.js
const { Pass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  console.log("Received event:", event); // Debug: Log the received event
  if (event.httpMethod !== 'POST') {
    console.log("Invalid HTTP method", event.httpMethod); // Debug: Log the invalid method
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Parse the incoming data from the event body
    const { membershipNumber, firstName, lastName } = JSON.parse(event.body);
    console.log("Received data:", { membershipNumber, firstName, lastName }); // Debug: Log the parsed data

    // Construct the file path for the pass.json file
    const passJsonPath = path.join(__dirname, '..', '..', 'stanford.pass', 'pass.json');
    console.log("Pass JSON Path:", passJsonPath); // Debug: Log the path of the pass.json file

    // Read and parse the pass.json file
    const passData = JSON.parse(fs.readFileSync(passJsonPath, 'utf8'));

    // Update the pass data with the received details
    passData.serialNumber = membershipNumber;
    passData.barcode.message = membershipNumber;
    passData.coupon.primaryFields[0].value = `${firstName} ${lastName}`;

    // Initialize a new pass
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

    // Load the icon file into the pass
    const iconPath = path.join(__dirname, '..', '..', 'stanford.pass', 'icon.png');
    console.log("Icon Path:", iconPath); // Debug: Log the path of the icon file
    pass.images.icon = fs.readFileSync(iconPath);

    // Generate the pass and collect the generated data into a buffer
    const stream = pass.generate();
    const buffers = [];
    for await (const chunk of stream) {
      buffers.push(chunk);
    }

    // Combine the chunks into a single buffer
    const passBuffer = Buffer.concat(buffers);

    // Return the generated pass as a base64-encoded string
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
    console.error("Error generating pass:", error); // Debug: Log the error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error', details: error.toString() }),
    };
  }
};
