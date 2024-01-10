const { PKPass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('HTTP Method:', event.httpMethod);

    if (event.httpMethod !== 'POST') {
        console.log("Method not allowed. Received:", event.httpMethod);
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        if (!event.body) {
            throw new Error("No body in the request");
        }
        console.log('Event Body:', event.body);

        const { membershipNumber, firstName, lastName } = JSON.parse(event.body);
        console.log('Parsed Data:', { membershipNumber, firstName, lastName });

        const passModelPath = path.join(__dirname, '..', 'saacard.pass');
        const template = fs.readFileSync(path.join(passModelPath, 'pass.json'), 'utf8');
        const passData = JSON.parse(template);

        // Modify pass with user data
        passData.serialNumber = membershipNumber;
        passData.barcodes[0].message = membershipNumber;
        passData.generic.primaryFields[0].value = `${firstName} ${lastName}`;
        passData.generic.secondaryFields[0].value = `Member ID: ${membershipNumber}`;

        const pass = new PKPass({
            model: passData,
            certificates: {
                wwdr: fs.readFileSync(path.join(__dirname, '..', 'certs', 'wwdr.pem')),
                signerCert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'SignerCert.pem')),
                signerKey: {
                    keyFile: fs.readFileSync(path.join(__dirname, '..', 'certs', 'SignerKey.pem')),
                    passphrase: process.env.PASS_CERTIFICATE_PASSWORD,
                },
            },
        });

        // Set images for the pass
        pass.images.icon = fs.readFileSync(path.join(passModelPath, 'icon.png'));
        pass.images.logo = fs.readFileSync(path.join(passModelPath, 'logo.png'));

        // Generate the pass and capture the output stream
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
