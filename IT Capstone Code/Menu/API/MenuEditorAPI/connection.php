<?php
    header("Access-Control-Allow-Origin: *");
    $ch = curl_init('https://connect.squareup.com/v2/catalog/list');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer EAAAFMbp3OQv4gz3BvpEkwskBy7lc_xnJhW4dnn8aSl_6eOw3H7kQJuiGciygFd3',
        'Square-Version: 2022-08-23',
        'Content-Type: application/json'
    ));
    $catalogItems = curl_exec($ch);
    $catalogItems =  substr_replace($catalogItems ,"",-1);
    echo $catalogItems;
?>