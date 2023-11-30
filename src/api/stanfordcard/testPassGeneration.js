// testPassGeneration.js (Should be outside of your function directory, e.g., in a scripts directory)
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Local server endpoint
const url = 'http://localhost:64946/.netlify/functions/generate-pass';

// Data to send to the endpoint
const data = {
  membershipNumber: '123456789',
  firstName: 'John',
  lastName: 'Doe',
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then((res) => {
  if (!res.ok) {
    throw new Error(`Server responded with ${res.status}`);
  }
  return res.buffer();
})
.then((buffer) => {
  fs.writeFileSync(path.resolve(__dirname, 'testPass.pkpass'), buffer);
  console.log('Pass downloaded successfully');
})
.catch((err) => {
  console.error('Error generating pass:', err);
});
