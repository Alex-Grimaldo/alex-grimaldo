<?php
    header("Access-Control-Allow-Origin: *");
    $ch = curl_init('https://connect.squareup.com/v2/orders/search');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer TOKEN',
        'Square-Version: 2022-08-23',
        'Content-Type: application/json'
    ));
    $post = '{ "return_entries": false,"query": {
      "filter": {}
    },
    "location_ids": [
      "LOCATION"
    ]
  }';
    curl_setopt($ch,CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS,  $post);
    $orderItems = curl_exec($ch);
    $orderItems =  substr_replace($orderItems ,"",-1);
    echo $orderItems;
    
    
?>


