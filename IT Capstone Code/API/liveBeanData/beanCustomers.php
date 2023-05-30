<?php
  header("Access-Control-Allow-Origin: *");
  $CustomerID = $_GET['CustomerID'];
   $ch = curl_init('https://connect.squareup.com/v2/customers/'.$CustomerID);
   curl_setopt($ch, CURLOPT_HTTPHEADER, array(
       'Authorization: Bearer TOKEN',
       'Square-Version: 2022-08-23',
       'Content-Type: application/json'
   ));

   $customerDtls = curl_exec($ch);
   $customerDtls =  substr_replace($customerDtls ,"",-1);
   echo $customerDtls;
    

    
?>