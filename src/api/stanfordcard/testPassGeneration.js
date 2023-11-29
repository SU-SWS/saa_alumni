const http = require('http');
const fs = require('fs');
const path = require('path');

// The options should be adjusted to target the local Netlify dev server
const options = {
  hostname: 'localhost',
  port: 8888, // Default port for Netlify Dev
  path: '/.netlify/functions/generate-pass', // Path to access Netlify Functions locally
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

// The test data should reflect the expected input of the Netlify Function
const data = JSON.stringify({
  membershipNumber: '12345',
  firstName: 'Jane',
  lastName: 'Doe',
});

// Send a request to the local Netlify dev server to invoke the function
const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  // Handle the response, save it to a file if the status code is 200
  if (res.statusCode === 200) {
    const file = fs.createWriteStream(path.join(__dirname, 'testPass.pkpass'));
    res.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log('Pass downloaded successfully');
    });
  } else {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  }
});

req.on('error', (error) => {
  console.error(error);
});

// Write the test data and end the request
req.write(data);
req.end();
