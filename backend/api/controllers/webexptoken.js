const jwt = require('jsonwebtoken');
const axios = require('axios');

require('dotenv').config();

// Set your secret key and expiration time
const secretKey = "e605fa854decc0c38ce3dd01233a0adda8bead2d1f460ae51ce602f7946f3d1d";
const expirationTimeInSeconds = -5; // Set a negative value to generate an expired token

// Create a payload with user information
const payload = {
  userId: '654e4a4b3e121cffc0adc1c7', // Replace with a valid user ID from your application
  username: 'miguel', // Replace with a valid username from your application
};

// Generate an expired token
const expiredToken = jwt.sign(payload, secretKey, { expiresIn: expirationTimeInSeconds });

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Make a GET request using axios
axios.get("http://localhost:8080/api/products", {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${expiredToken}`, // Add the Authorization header with the expired token
  },
})
  .then(response => {
    // Log the full response details
    console.log('Response Status Code:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
  })
  .catch(error => {
    // Log the error details
    console.error('Error Status Code:', error.response ? error.response.status : 'N/A');
    console.error('Error Headers:', error.response ? error.response.headers : 'N/A');
    console.error('Error Data:', error.response ? error.response.data : 'N/A');

    // Check if the error is due to JWT expiration
    if (error.response && error.response.status === 401 && error.response.data.message === 'Unauthorized') {
      console.log('JWT expired:', error.response.data);
    } else if (error.name === 'TokenExpiredError') {
      console.log('JWT expired:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
  });

console.log('Expired Token:', expiredToken);
