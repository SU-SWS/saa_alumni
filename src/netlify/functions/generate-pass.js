// Node.js backend script
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Endpoint to serve the test.txt file
app.get('/generate-pass', (req, res) => {
    const filePath = path.join(__dirname, 'test.txt');
    res.sendFile(filePath);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
