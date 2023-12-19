const { PKPass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

// Mock data for testing
const data = {
  membershipNumber: '123456789',
  firstName: 'John',
  lastName: 'Doe',
};

async function generatePass(data) {
  try {
    // The path to the pass model directory
    const passModelDirectory = path.join(__dirname, '..', 'saacard.pass');

    // Reading certificates from the new certs directory
    const wwdr = fs.readFileSync(path.join(__dirname, '..', 'certs', 'wwdr.pem'));
    const signerCert = fs.readFileSync(path.join(__dirname, '..', 'certs', 'SignerCert.pem'));
    const signerKey = fs.readFileSync(path.join(__dirname, '..', 'certs', 'SignerKey.pem'));

    // Create pass using PKPass.from
    const pass = await PKPass.from({
      model: passModelDirectory,
      certificates: {
        wwdr,
        signerCert,
        signerKey,
        signerKeyPassphrase: 'test', // The pass phrase for the SignerKey.pem
      },
    }, {
      serialNumber: data.membershipNumber, // This line is necessary for the pass serial number
      // ... other overrides
    });
 // Adding background or strip image to the pass
 const imagePath = path.join(__dirname, '..', 'saacard.pass', 'background.png'); // or 'strip.png'
 const imageBuffer = fs.readFileSync(imagePath);
 pass.addBuffer('background.png', imageBuffer); // or 'strip.png'

 // Generate the pass and collect the generated data into a buffer
 const stream = await pass.getAsStream();
 const buffers = [];
 for await (const chunk of stream) {
   buffers.push(chunk);
 }

 // Combine the chunks into a single buffer
 const passBuffer = Buffer.concat(buffers);

 // Write the pass to a file
 fs.writeFileSync(path.join(passModelDirectory, 'pass.pkpass'), passBuffer);

 console.log("Pass generated successfully!");
} catch (error) {
 console.error("Error generating pass:", error);
}
}

// Replace 'YourPEMPassPhrase' with the actual passphrase you used to encrypt the SignerKey.pem
generatePass(data);