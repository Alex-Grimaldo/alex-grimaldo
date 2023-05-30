<?php
    header("Access-Control-Allow-Origin: *");
    $ch = curl_init('https://connect.squareup.com/v2/orders/search');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer EAAAEXdxxMSKgAfMriMLi4_780p2jZqJ6YJzFBGhjFHn624476C8CzLjWx-lAfbD',
        'Square-Version: 2022-08-23',
        'Content-Type: application/json'
    ));
    
    $datetime_Start = date(DATE_RFC3339, strtotime('-2 days'));
    $datetime_End = date(DATE_RFC3339, strtotime('+2 days'));
    $post = '{ "location_ids": [
      "LSVMMX80F6GF9"
    ],
    "query": {
      "sort": {
        "sort_field": "CLOSED_AT",
        "sort_order": "DESC"
      },
      "filter": {
        "state_filter": {
          "states": [
            "COMPLETED"
          ]
        },
        "date_time_filter": {
          "closed_at": {
            "end_at": "2023-04-12T20:38:47Z",
            "start_at": "2023-04-12T10:38:47Z"
          }
        }
      }
    }
    }';
    curl_setopt($ch,CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS,  $post);
    $orderItems = curl_exec($ch);
    $orderItems =  substr_replace($orderItems ,"",-1);
    echo $orderItems;
    
    
?>


