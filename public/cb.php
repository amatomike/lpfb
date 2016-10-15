<?php
echo "<!doctype html>
<html>
<head>
    <title>Listing pass callback</title>
<script></script>
</head>
<body>";
require '../vendor/autoload.php';
$grantCode = isset($_GET["openid_spark_code"])?$_GET['openid_spark_code']:$_GET['code'];
$agentId = isset($_GET['openid.spark.state'])?$_GET['openid.spark.state']:'temp_dev_id';
//$error = isset($_GET['openid.error'])?$_GET['openid.error']:$_GET['error'].$_GET['error_description'];
//echo $error?$error:'no error';
$lpauth = [
    "type"=> "service_account",
  "project_id"=> "listingpass-a8f61",
  "private_key_id"=> "00e0aed2ebced1bf44e8cb6f56b9efdcac97a809",
  "private_key"=> "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCyCcretfccSNSk\ng+S3InJiBEdi+H3PoDJRTPVYzEDISS2eIKSFxS0xF6K98aAxQhk6Wxcfja8z94vC\nKZP3quD/Oe+npVOs5wj35N8yxvVnUTUFV9Ns9vJj4uFpgzWTBj8/lXvK/7mLc5iC\nTkJ6umf2f29ZBrGdIFNkK9Rq7oIOfGDwVt1x2hmusoW8UvTTbF6UVFv9qh8uABzJ\njmPbqK2ufhE9hy9Ezj/rlrVfiDWug9sj+3drxxk0pQ59z0QiCG0rPi9N7u9ln5sG\nEUxwiy4YxOBtSabQjMbcqgKBZLxIolNmb6riG5R1TLwf9Uh+YgrUFAeqlk7UJj9S\nIyJ8a1v3AgMBAAECggEAbazCoHeQBoiHFeF6H6bEt8TTBRD2z9RrqtGxwkXxEnCh\n/Ws2boGM2VUqF8ClYjLJv70lfXaWm3i/S5i5YjSN7iwOikO6TCT2zV7ccDdILaFE\n/EmiINnvb8DwA0Ok2TFb/Rtk6ySldFZ9eKglI9149cyDF2CcQaMMPAUUEdtjmu/T\nv5Czh4I1I2UAcOHBm2ZOpU7GcAmYAXoAywsXXG3qM05bl3QCi5Hi7TZZPtxTaXxR\nSqF9OjD5gTmYz3rUKk8PbIXons6Qm82e7E6YD4Z/r1mAeKnBPb3fjK9aREjN8ZKo\nq9t/KTKGKrzxk7X/bg+q4U7d3IzWobxOWA+xDccS4QKBgQDqxVMvKVUSSphlFK/E\n60HIkZlEcy7+yu3Qpo9roDAl0UYQlYzU4aMI4aq6VNOQcmRzeNaNYQAvcLKiUiOS\nwglrLrHhzZQU17AAJMR+0ObQYN49cywFh1RXQq0T+VK3MPwUq/xuvWplwCogna9b\ntorl5GGwARX36NFHUqblzKKoLQKBgQDCIyyMUcQ7bZMdjGhnF4WN2IqScAane28D\no7G4fs3wvKxN0+LAdIpdhZbRVeZ4tZfXbfLFMKgy+khX31ozQeTSLYSIuNiP3hKK\nGigf1zLXYNgArwYa/HlpHhDf5hNgG+6ety1WcQcExc4XnICY+isk7hztfduhUj2o\nmyHIFBknMwKBgQCrv3+DWPFrWDb0e5W6sYCGgj1l3f3bWAlyQudZDO8sO1TOfRly\nAz+KF80WU0gSvBzQfO44r2W7Tu7f4Mc1bc4GIzruvb4/ISsYb81wGNNCThtHSSJD\nSSViUNzdZ+AjNCq11LvvJ5LWrSYkhjbrGTezxsfQQnsXybKQQt7l7jZwYQKBgGbt\n9UGUXKFRkE17UyNNkk7Jf3bylGSaChr44FI8UP4RWp2M+M0nPPEm0fa9P4vCY/Yh\nYjTwfk1A67hDQHSqvCI/ZeSDdLaafGPiSGHRXDBbNUrvgSIvuENmYHYFa0JqrNJT\ntmL9XEZIheN446m4AcX7xTSZpSfcDbrmPTvyg/+HAoGBAMF6nvGa9/Yon7l+SSFL\nD2UgGewuFZq4BNuSs+TavwRuI2RH3uLScZjZ68Y8QrH1poS4z4p6NJ5Q665qyBhv\nqczC6Cc4p91/ufxCX+pgCzqt1LqfcHHjdDV6vgCXfzy3ZjWwh19WFl/NgIDb/OcI\n2JF3par/RQgbRol+2XlI2AnP\n-----END PRIVATE KEY-----\n",
  "client_email"=> "listingpassphp@listingpass-a8f61.iam.gserviceaccount.com",
  "client_id"=> "101763331364363692698",
  "auth_uri"=> "https=>//accounts.google.com/o/oauth2/auth.js",
  "token_uri"=> "https=>//accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url"=> "https=>//www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url"=> "https=>//www.googleapis.com/robot/v1/metadata/x509/listingpassphp%40listingpass-a8f61.iam.gserviceaccount.com"
];
$firebase = Firebase::fromServiceAccount($lpauth);

$database = $firebase->getDatabase();

$root = $database->getReference('/');

$completeSnapshot = $root->getSnapshot();

$root->getChild("users/".$agentId)->push([
    'authCode' => $grantCode
]);

$users = $database->getReference('users');

$reference = $database->getReference('users/'.$agentId);
$value = $reference->getValue();
echo "<div>".json_encode($value)."</div><br/><br/><br/><br/>";
error_log('token value'.json_encode($value, JSON_PRETTY_PRINT));
$urlend = "?";
$add="";
$max = count($_GET);
$i=1;
foreach ($_GET as $k => $v ){
    $ending = '&';
    if($i>=$max){
        $ending = '';
    }
    $add = $urlend.$k."=".$v.$ending;
    $urlend = $add;
    $i++;
}
echo $urlend;
echo '<div><h1>o<a href="http://listingpass.web.mikeamato.org:3000/callback'.$urlend.'">go Local!</a></h1><br/></div>';
?>
</body></html>
