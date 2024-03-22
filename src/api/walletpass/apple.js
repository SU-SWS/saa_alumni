// import { generateAplleWalletPass } from '../../utilities/walletPass';
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  // // eslint-disable-next-line no-console
  // console.log('HTTP Method:', event.httpMethod);
  // // eslint-disable-next-line no-console
  // console.log('Received event:', event);

  // if (event.httpMethod !== 'POST') {
  //   // eslint-disable-next-line no-console
  //   console.log('Method not allowed. Received:', event.httpMethod);
  //   return {
  //     statusCode: 405,
  //     body: 'Method Not Allowed',
  //   };
  // }

  try {
    // if (!event.body) {
    //   throw new Error('No body in the request');
    // }
    // eslint-disable-next-line no-console
    // console.log('Event Body:', event.body);

    // const { membershipNumber, firstName, lastName } = JSON.parse(event.body);
    // eslint-disable-next-line no-console
    const membershipNumber = '123456789';
    const firstName = 'John';
    const lastName = 'Doe';

    console.log('Parsed Data:', { membershipNumber, firstName, lastName });

    // const pkpass = await generateAplleWalletPass(
    //   membershipNumber,
    //   firstName,
    //   lastName
    // );

    const pkpass = fs.readFileSync(
      path.join(
        __dirname,
        '..',
        '..',
        'utilities',
        'saacard.pass',
        'Generic.pkpass'
      )
    );
    console.log('-------------------------------');
    console.log('Passkit:', pkpass);

    if (pkpass) {
      res
        .status(200)
        .headers({
          'Content-Type': 'application/vnd.apple.pkpass',
          'Content-Disposition': 'attachment; filename="pass.pkpass"',
        })
        .send(pkpass);
    } else {
      res.status(500).send('Passkit generation failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Passkit generation failed. Please try again.');
  }
}
