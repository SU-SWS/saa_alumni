const { PKPass } = require('passkit-generator');
const path = require('path');
const axios = require('axios');
const fs = require('fs').promises;

// walletPass.js
export const generateAppleWalletPass = async (megaProfileUser, filename) => {
  try {
    const passModelDirectory = path.resolve(__dirname, 'saacard.pass');
    const width = 180; // Set the width you need for the thumbnail

    // Extract the relevant fields from megaProfileUser
    const {
      contact: {
        name: { digitalName: memberName },
        birthDate,
      },
      memberships: [{ membershipNumber, membershipStartDate, membershipType }],
      emails: [{ emailAddress }],
    } = megaProfileUser;

    // Fetch the signed URL from your API
    const { data } = await axios.get('/api/assets', { params: { filename } });
    const signedUrl = data.signedUrl;

    // Fetch the image from the signed URL
    const imageUrl = `https://assets.stanford.edu/p/${width}x${width}/${encodeURIComponent(signedUrl)}`;
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = imageResponse.data;

    // Write the image buffer to the pass directory as thumbnail.png
    const thumbnailPath = path.join(passModelDirectory, 'thumbnail.png');
    await fs.writeFile(thumbnailPath, imageData);

    // Continue with pass generation
    const pass = await PKPass.from({
      model: passModelDirectory,
      certificates: {
        wwdr: process.env.APPLE_WWDR_CERTIFICATE,
        signerCert: process.env.PASS_SIGNING_CERTIFICATE,
        signerKey: process.env.PASS_SIGNING_CERTIFICATE_KEY,
        signerKeyPassphrase: process.env.PASS_CERTIFICATE_PASSWORD, // Correct this to use the environment variable
      },
      serialNumber: membershipNumber,
    });

    // Add fields to the pass
    pass.primaryFields.push({
      key: 'memberName',
      label: 'NAME',
      value: memberName,
    });
    pass.secondaryFields.push({
      key: 'membershipNumber',
      label: 'NUMBER',
      value: membershipNumber,
    });
    pass.secondaryFields.push({
      key: 'memberSince',
      label: 'SINCE',
      value: new Date(membershipStartDate).toLocaleDateString(), // Convert to readable date if necessary
    });
    pass.auxiliaryFields.push({
      key: 'emailAddress',
      label: 'EMAIL',
      value: emailAddress,
    });
    pass.auxiliaryFields.push({
      key: 'birthDate',
      label: 'BIRTHDATE',
      value: new Date(birthDate).toLocaleDateString(), // Convert to readable date if necessary
    });

    // Set the thumbnail image
    pass.images.thumbnail = imageData;

    // Return the generated pass
    return pass;
  } catch (error) {
    console.error('Error generating Apple Wallet Pass:', error);
    return null;
  }
};
