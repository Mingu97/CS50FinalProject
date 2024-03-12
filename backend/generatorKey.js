const crypto = require('crypto');
const fs = require('fs');


const generateKey = () => {
  const key = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync('secret-key.txt', key)
  console.log('Generated Key:', key);
};

generateKey();
