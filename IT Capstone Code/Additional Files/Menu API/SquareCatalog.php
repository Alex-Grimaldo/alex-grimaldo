<?php
    header("Access-Control-Allow-Origin: *");
    $ch = curl_init('https://connect.squareup.com/v2/catalog/list');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer EAAAEXdxxMSKgAfMriMLi4_780p2jZqJ6YJzFBGhjFHn624476C8CzLjWx-lAfbD',
        'Content-Type: application/json'
    ));

    $catalogItems = curl_exec($ch);
    $catalogItems =  substr_replace($catalogItems ,"",-1);
    echo $catalogItems;
?>

