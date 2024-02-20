const { PKPass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

export async function handler(event, context) {
  // eslint-disable-next-line no-console
  console.log('HTTP Method:', event.httpMethod);
  // eslint-disable-next-line no-console
  console.log('Received event:', event);

  if (event.httpMethod !== 'POST') {
    // eslint-disable-next-line no-console
    console.log('Method not allowed. Received:', event.httpMethod);
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    if (!event.body) {
      throw new Error('No body in the request');
    }
    // eslint-disable-next-line no-console
    console.log('Event Body:', event.body);

    const { membershipNumber, firstName, lastName } = JSON.parse(event.body);
    // eslint-disable-next-line no-console
    console.log('Parsed Data:', { membershipNumber, firstName, lastName });

    const passModelDirectory = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'saacard.pass'
    );

    const wwdr = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'certs', 'wwdr.pem')
    );
    const signerCert = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'certs', 'SignerCert.pem')
    );
    const signerKey = fs.readFileSync(
      path.join(__dirname, '..', '..', 'src', 'certs', 'SignerKey.pem')
    );

    const pass = await PKPass.from(
      {
        model: passModelDirectory,
        certificates: {
          wwdr,
          signerCert,
          signerKey,
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
    pass.images.icon = fs.readFileSync(
      path.join(passModelDirectory, 'icon.png')
    );
    pass.images.logo = fs.readFileSync(
      path.join(passModelDirectory, 'logo.png')
    );
    const backgroundPath = path.join(passModelDirectory, 'background.png');
    pass.addBuffer('background.png', fs.readFileSync(backgroundPath));

    // Generate the pass and collect the generated data into a buffer
    const stream = await pass.getAsStream();
    const buffers = [];
    for await (const chunk of stream) {
      buffers.push(chunk);
    }
    const passBuffer = Buffer.concat(buffers);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': 'attachment; filename="pass.pkpass"',
        'Access-Control-Allow-Origin': '*', // Adjust as needed for production
      },
      body: passBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error processing the request:', error.message); // Log only the error message
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Include CORS headers in the error response
      },
      body: JSON.stringify({ error: 'Server Error', details: error.message }), // Log only the error message
    };
  }
}

export default handler;
