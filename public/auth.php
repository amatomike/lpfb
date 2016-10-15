<?php
$agentId=$_GET['agentId'];
$vowClientId = 'f3p47enx4dt0l18trvlq1513y';
$vowClientSecret = '6efg58guqkylra3g1zm8r1uj1';
$privateClientId = 'auu4dwzb2yq116q1au0i8pcsd';
$privateClientSecret = '7wjjbim346y9gkr77iaacdura';
$clientId = $privateClientId;
$clientSecret = $privateClientSecret;
$callbackAuthUrl = 'https://listingpass-a8f61.firebaseapp.com/callback';
//https://sparkplatform.com/openid?openid.mode=checkid_setup&openid.return_to=https://listingpass-a8f61.firebaseapp.com/callback&openid.spark.client_id=auu4dwzb2yq116q1au0i8pcsd&openid.spark.combined_flow=true
$sparkOpenIdAuthURL = 'https://sparkplatform.com/openid?openid.mode=checkid_setup&openid.return_to='.$callbackAuthUrl.'&openid.spark.client_id=' . $clientId . '&openid.spark.combined_flow=true&openid.spark.state='.$agentId;
header("Location: " . $sparkOpenIdAuthURL);
$config = array(    apiKey: "AIzaSyBoZcHDGb04f0bUWlr3duyHGpV8_HEC7qI",
    authDomain: "listingpass-a8f61.firebaseapp.com",
    databaseURL: "https://listingpass-a8f61.firebaseio.com",
    storageBucket: "listingpass-a8f61.appspot.com",
    messagingSenderId: "524768609692");
$firebase = new Firebase\FirebaseAPI($config);
