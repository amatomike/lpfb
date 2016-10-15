'use strict';

const express = require('express');
const simpleOauthModule = require('simple-oauth2');
var https = require('https');
var http = require('http');
var fs = require('fs');
var options = {
  key: fs.readFileSync('/etc/webmin/letsencrypt-key.pem'),
  cert: fs.readFileSync('/etc/webmin/letsencrypt-cert.pem'),
  ca: fs.readFileSync('/etc/webmin/letsencrypt-ca.pem')
};

const app = express();
https.createServer(options, app).listen(443);

const oauth2 = simpleOauthModule.create({
  client: {
    id: 'mo_1524_key_1',
    secret: 'UtwT0Qp07oBrVO0UiDqXu',
  },
  auth: {
    authorizeHost: 'https://sparkplatform.com',
    tokenHost: 'https://sparkapi.com',
    tokenPath: '/v1/oauth2/grant',
    authorizePath: '/oauth2'
  },
});

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'https://listingpass.web.mikeamato.org/callback'
});

// Initial page redirecting to Github
app.get('/auth.js', (req, res) => {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
  console.log(req.query);
  const code = req.query.code;
  const options = {
    code
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
   console.log(result);
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }
    console.log('The resulting token: ', result);
    const token = oauth2.accessToken.create(result);

    return res
      .status(200)
      .json(token);
  });
});

app.get('/success', (req, res) => {
  res.send('');
});
const callbackAuthUrl = 'https://listingpass.web.mikeamato.org/callback';
const clientId = 'auu4dwzb2yq116q1au0i8pcsd';
const agentId = 'devdemo';
const sparkOpenIdAuthURL = 'https://sparkplatform.com/openid?openid.mode=checkid_setup&openid.return_to='+callbackAuthUrl+'&openid.spark.client_id=' + clientId + '&openid.spark.combined_flow=true&openid.spark.state='+agentId;
app.get('/', (req, res) => {
  res.send('Hello<br><a href="/auth.js">Log in with Spark</a>'+
  '<a href="'+sparkOpenIdAuthURL+'">openId login</a>');
});

app.listen(3000, () => {
  console.log('Express server started on port 3000'); // eslint-disable-line
});


// Credits to [@lazybean](https://github.com/lazybean)
