'use strict';

var express = require('express')
    , session = require('express-session')
// const simpleOauthModule = require('simple-oauth2');
var ClientOAuth2 = require('client-oauth2')
var vowClientId = 'f3p47enx4dt0l18trvlq1513y'
var vowClientSecret = '6efg58guqkylra3g1zm8r1uj1'
var privateClientId = 'auu4dwzb2yq116q1au0i8pcsd'
var privateClientSecret = '7wjjbim346y9gkr77iaacdura'
var clientId = privateClientId;
var clientSecret = privateClientSecret;
var authCode = 'UNSET';
var accessToken = 'UNSETACCESS';
var refreshToken = 'UNSETREFRESH';
var tokenExchangeUrl = 'https://sparkapi.com/v1/oauth2/grant';
var redirectUrl = 'https://listingpass.web.mikeamato.org:2443/callback'
//https://sparkplatform.com/openid?openid.mode=checkid_setup&openid.return_to=https://listingpass-a8f61.firebaseapp.com/callback&openid.spark.client_id=auu4dwzb2yq116q1au0i8pcsd&openid.spark.combined_flow=true
const callbackAuthUrl = 'https://listingpass.web.mikeamato.org:2443/callback';
var sparkOpenIdAuthURL = 'https://sparkplatform.com/openid?openid.mode=checkid_setup&openid.return_to='+callbackAuthUrl+'&openid.spark.client_id=' + clientId + '&openid.spark.combined_flow=true';
const agentId = 'devdemo';

var https = require('https');
var http = require('http');
var fs = require('fs');
var ssloptions = {
  key: fs.readFileSync('/etc/webmin/letsencrypt-key.pem'),
  cert: fs.readFileSync('/etc/webmin/letsencrypt-cert.pem'),
  ca: fs.readFileSync('/etc/webmin/letsencrypt-ca.pem')
};

var Grant = require('grant-express')
    , grant = new Grant(require('./config.json'))
var app = express()
app.use(session({secret: 'grant'}))
// app.use(logger('dev'))
// REQUIRED:
app.use(session({secret: 'very secret'}))
// mount grant
app.use(grant)

// dummy authorize url
// because http://oauthbin.com doesn't provide one

https.createServer(ssloptions, app).listen(2443);

var sparkAuth = new ClientOAuth2({
  clientId: clientId,
  clientSecret: clientSecret,
  accessTokenUri: ' https://sparkapi.com/v1/oauth2/grant',
  authorizationUri: 'https://sparkplatform.com/oauth2',
  authorizationGrants: ['credentials'],
  redirectUri: 'https://listingpass.web.mikeamato.org:2443/callback'});
// Can also just pass the raw `data` object in place of an argument.
//var token = sparkAuth.createToken(accessToken, refreshToken, { data:'somedata'})

// Refresh the users credentials and save the updated access token.
function storeNewToken(newtoken) {
  console.log(newtoken);
  accessToken = token.accessToken;
  refreshToken = newtoken.refreshToken;
}
// token.refresh().then(storeNewToken)

// Initial page redirecting to Github
app.get('/auth.js', (req, res) => {
  req.headers['X-SparkApi-User-Agent'] = 'Listingpass';
  req.headers['Content-Type'] = 'application/json';
  req.headers['clientId'] = sparkAuth.clientId;
  // res.headers['X-SparkApi-User-Agent'] = 'Listingpass';
  // res.headers['Content-Type'] = 'application/json';
  var uri = sparkAuth.accessTokenUri;
  res.location(uri);
});

// Callback service parsing the authorization token and asking for the access token
// app.get('/callback', (req, res) => {
//
//   console.log(req.query.code+'code!!!!!!!!!!!!!!!');
//   const code = req.query.openid.spark.code;
//   const options = {
//     code
//   };
//   sparkAuth.code(tokenExchangeUrl)
//       .then(function (storeIt) {
//         storeNewToken(storeIt);
//         console.log(storeIt.accessToken+'stored at') //=> { accessToken: '...', tokenType: 'bearer', ... }
//
//         // // Refresh the current users access token.
//         // user.refresh().then(function (updatedUser) {
//         //   console.log(updatedUser !== user) //=> true
//         //   console.log(updatedUser.accessToken)
//         // })
//
//         // Sign API requests on behalf of the current user.
//         // user.sign({
//         //   method: 'get',
//         //   url: 'http://example.com'
//         // })
//         //
//         // // We should store the token into a database.
//
//         res.headers['X-SparkApi-User-Agent'] = 'Listingpass';
//         res.headers['Content-Type'] = 'application/json';
//         return res.send('ok'+accessToken)
//       })
// })



app.get('/success', (req, res) => {
  res.send('<a><strong>success</strong></a>');
});
app.get('/', (req, res) => {
  res.send('<strong>Hello</strong><br><a href="/auth.js"><br/><strong>Log in</strong> with Spark</a>'+
  '<a href="'+sparkOpenIdAuthURL+'">openId <strong>login</strong></a>');
});
app.get('/callback', function (req, res) {
    const code = req.query['openid.spark.code']?req.query['openid.spark.code']:req.param['code'];
    var openid = req.query['openid.spark.code']?true:false;
    if(openid)
    {

        res.location(sparkAuth.accessTokenUri);

    }
  console.log(req.query['openid.spark.code']+'>->-->---> from callback');
    authCode = req.query['openid.spark.code'];
    res.location(sparkAuth.accessTokenUri);

})

app.get('/callback2', function (req, res) {
  console.log(req.session.grant.response+'>->-->---> from callback2')
  res.end(JSON.stringify(req.session.grant.response, null, 2))
})
app.get('/authorize', function (req, res) {
  // var requestKey = res.query.code;
  var qs = require('querystring')
  res.redirect('' +
      qs.stringify({oauth_token: 'requestkey', oauth_verifier: '123'}))
})

// app.get('/handle_oauthbin_callback', function (req, res) {
//   console.log(req.query)
//   // dummy response that we're expecting
//   var assert = require('assert')
//   assert.deepEqual(req.query, {
//     access_token: 'accesskey',
//     access_secret: 'accesssecret',
//     raw: {
//       oauth_token: 'accesskey',
//       oauth_token_secret: 'accesssecret'
//     }
//   })
//   res.end(JSON.stringify(req.query, null, 2))
// })

app.listen(3000, function () {
  console.log('Express server listening on port ' + 3000)
})


// Credits to [@lazybean](https://github.com/lazybean)
