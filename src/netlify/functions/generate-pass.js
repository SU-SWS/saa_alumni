const { PKPass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Adjust in production to specific origins
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request for CORS preflight.');
    return {
      statusCode: 204,
      headers,
    };
  }

  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log('HTTP Method:', event.httpMethod);

  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed. Received:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: 'Method Not Allowed',
    };
  }

  try {
    if (!event.body) {
      throw new Error('No body in the request');
    }
    console.log('Event Body:', event.body);

    const { membershipNumber, firstName, lastName } = JSON.parse(event.body);
    console.log('Parsed Data:', { membershipNumber, firstName, lastName });

    console.log('Reading pass model and template...');
    const passModelPath = path.join(__dirname, '..', 'saacard.pass');
    const template = fs.readFileSync(
      path.join(passModelPath, 'pass.json'),
      'utf8'
    );
    const passData = JSON.parse(template);

    console.log('Modifying pass with user data...');

    // Modify pass with user data
    passData.serialNumber = membershipNumber;
    passData.barcodes[0].message = membershipNumber;
    passData.generic.primaryFields[0].value = `${firstName} ${lastName}`;
    passData.generic.secondaryFields[0].value = `Member ID: ${membershipNumber}`;

    const pass = new PKPass({
      model: passData,
      certificates: {
        wwdr: fs.readFileSync(path.join(__dirname, '..', 'certs', 'wwdr.pem')),
        signerCert: fs.readFileSync(
          path.join(__dirname, '..', 'certs', 'SignerCert.pem')
        ),
        signerKey: {
          keyFile: fs.readFileSync(
            path.join(__dirname, '..', 'certs', 'SignerKey.pem')
          ),
          passphrase: process.env.PASS_CERTIFICATE_PASSWORD,
        },
      },
    });

    // Set images for the pass
    pass.images.icon = fs.readFileSync(path.join(passModelPath, 'icon.png'));
    pass.images.logo = fs.readFileSync(path.join(passModelPath, 'logo.png'));

    // Generate the pass and capture the output stream
    console.log('Generating pass...');
    const stream = await pass.getAsStream();
    const buffers = [];
    for await (const chunk of stream) {
      buffers.push(chunk);
    }
    const passBuffer = Buffer.concat(buffers);

    console.log('Pass generated successfully.');
    return {
      statusCode: 200,
      headers: {
        ...headers,
        ...responseHeaders,
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': 'attachment; filename="pass.pkpass"',
      },
      body: passBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error processing the request:', error);
    return {
      statusCode: 500,
      headers, // Include CORS headers in the error response
      body: JSON.stringify({
        error: 'Server Error',
        details: error.toString(),
      }),
    };
  }
};
