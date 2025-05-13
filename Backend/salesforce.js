const qs = require('qs');
require('dotenv').config();

const getOAuthUrl = () => {
  return `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`;
};

const getToken = async (code) => {
  const axios = require('axios');

  const response = await axios.post('https://login.salesforce.com/services/oauth2/token',
    qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: code
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );

  return response.data;
};

module.exports = { getOAuthUrl, getToken };
