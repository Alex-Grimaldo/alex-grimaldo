<?php
    header("Access-Control-Allow-Origin: *");
    $ch = curl_init('https://connect.squareup.com/v2/catalog/list');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer TOKEN',
        'Content-Type: application/json'
    ));

    $catalogItems = curl_exec($ch);
    $catalogItems =  substr_replace($catalogItems ,"",-1);
    echo $catalogItems;
?>

