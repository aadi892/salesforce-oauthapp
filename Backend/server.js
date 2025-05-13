require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { getOAuthUrl, getToken } = require('./salesforce');

const app = express();
app.use(cors());
app.use(express.json());

// Redirect user to Salesforce login
app.get('/oauth/login', (req, res) => {
  const oauthUrl = getOAuthUrl();
  res.redirect(oauthUrl);
});

// Salesforce callback with code
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await getToken(code);
    const redirectTo = `${process.env.FRONTEND_REDIRECT}?access_token=${tokenResponse.access_token}&instance_url=${tokenResponse.instance_url}`;
    res.redirect(redirectTo);
  } catch (err) {
    console.error('OAuth callback error:', err.message);
    res.status(500).send('OAuth failed');
  }
});

app.get('/api/accounts', async (req, res) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    const instanceUrl = req.headers.instance;
  
    if (!accessToken || !instanceUrl) {
      return res.status(400).json({ error: 'Missing access token or instance URL' });
    }
  
    try {
      const response = await axios.get(
        `${instanceUrl}/services/data/v59.0/query/?q=SELECT+Id,Name,Rating,Website,Phone+FROM+Account`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      res.json(response.data.records);
    } catch (err) {
      console.error('Salesforce API error:', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch accounts' });
    }
  });
  

app.listen(4000, () => {
  console.log('Salesforce backend running at http://localhost:4000');
});
