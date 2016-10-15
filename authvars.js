var md5 = require('./md5');
AuthToken = 'f5b82f343bc7e9442af3f8ca917f5100';
apiKey = 'mo_1524_key_1';
apiSecret =  'UtwT0Qp07oBrVO0UiDqXu';
apiSignature = md5(apiSecret+'ApiKey'+apiKey);
theurl='https://sparkapi.com/v1/listings?AuthToken=f5b82f343bc7e9442af3f8ca917f5100&_filter=PropertyType%20Eq%20'A'&ApiSig=c3937e4be6836effc8cadef58f587edb'
https://sparkplatform.com/oauth2?response_type=code&client_id=mo_1524_key_1&redirect_uri=https://listingpass.web.mikeamato.org:2443/callback

{
    "client_id": "mo_1524_key_1",
    "client_secret": "UtwT0Qp07oBrVO0UiDqXu",
    "grant_type": "authorization_code",
    "redirect_uri": "[redirect_uri]"

}