<?php  
   header("Access-Control-Allow-Origin: *");
   $OrderID = $_GET['OrderID'];
    $ch = curl_init('https://connect.squareup.com/v2/orders/'.$OrderID);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer TOKEN',
        'Square-Version: 2022-08-23',
        'Content-Type: application/json'
    ));

    $orderDtls = curl_exec($ch);
    $orderDtls =  substr_replace($orderDtls ,"",-1);
    echo $orderDtls;
?> 