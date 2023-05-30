<?php

  //   header("Access-Control-Allow-Origin: *");
  //   $ch = curl_init('https://connect.squareup.com/v2/customers/search');
  //   curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  //       'Authorization: Bearer EAAAEXdxxMSKgAfMriMLi4_780p2jZqJ6YJzFBGhjFHn624476C8CzLjWx-lAfbD',
  //       'Square-Version: 2023-03-15',
  //       'Content-Type: application/json'
  //   ));
    
  //   $post = '{ 
      
  //   "limit": 100,
  //   "query": {
  //     "filter": {
  //       "updated_at": {
  //         "end_at": "2023-04-12T20:38:47Z",
  //         "start_at": "2023-04-12T10:38:47Z"
  //       }
  //     }
  //   }
  // }';
  //   curl_setopt($ch,CURLOPT_POST, 1);
  //   curl_setopt($ch, CURLOPT_POSTFIELDS,  $post);
  //   $updatedCustomers = curl_exec($ch);
  //   $updatedCustomers =  substr_replace($updatedCustomers ,"",-1);
  //   echo $updatedCustomers;
  header("Access-Control-Allow-Origin: *");
  $CustomerID = $_GET['CustomerID'];
   $ch = curl_init('https://connect.squareup.com/v2/customers/'.$CustomerID);
   curl_setopt($ch, CURLOPT_HTTPHEADER, array(
       'Authorization: Bearer EAAAEXdxxMSKgAfMriMLi4_780p2jZqJ6YJzFBGhjFHn624476C8CzLjWx-lAfbD',
       'Square-Version: 2022-08-23',
       'Content-Type: application/json'
   ));

   $customerDtls = curl_exec($ch);
   $customerDtls =  substr_replace($customerDtls ,"",-1);
   echo $customerDtls;
    

    
?>



    






    