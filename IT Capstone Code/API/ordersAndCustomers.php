<?php 
header("Access-Control-Allow-Origin: *");
$locationID = 'LSVMMX80F6GF9'; // Replace with your actual location ID
$limit = 100; // Number of customers to retrieve per request

$url = 'https://connect.squareup.com/v2/customers?location_id=' . $locationID . '&limit=' . $limit;
$allCustomers = array();

do {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer EAAAEXdxxMSKgAfMriMLi4_780p2jZqJ6YJzFBGhjFHn624476C8CzLjWx-lAfbD',
        'Square-Version: 2022-08-23',
        'Content-Type: application/json'
    ));

    $customerDtls = curl_exec($ch);
    $customerDtls = substr_replace($customerDtls, "", -1);
    $customerData = json_decode($customerDtls, true);

    $customers = $customerData['customers'] ?? array();
    $allCustomers = array_merge($allCustomers, $customers);

    $cursor = $customerData['cursor'] ?? null;
    if ($cursor) {
        $url = 'https://connect.squareup.com/v2/customers?location_id=' . $locationID . '&cursor=' . $cursor . '&limit=' . $limit;
    } else {
        $url = null;
    }

    curl_close($ch);
} while ($url);

echo json_encode($allCustomers);

  // header("Access-Control-Allow-Origin: *");
  // $CustomerID = $_GET['CustomerID'];
  //  $ch = curl_init('https://connect.squareup.com/v2/customers/'.$CustomerID);
  //  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  //      'Authorization: Bearer EAAAEXdxxMSKgAfMriMLi4_780p2jZqJ6YJzFBGhjFHn624476C8CzLjWx-lAfbD',
  //      'Square-Version: 2022-08-23',
  //      'Content-Type: application/json'
  //  ));

  //  $customerDtls = curl_exec($ch);
  //  $customerDtls =  substr_replace($customerDtls ,"",-1);
  //  echo $customerDtls;


  // $arrOrder1001 = array("orderID" => "1001", "Items" => "Americano", "Status" => "New");
   // $arrOrder1002 = array("orderID" => "1002", "Items" => "Cookie", "Status" => "New");
   // $arrOrder1003 = array("orderID" => "1003", "Items" => "Candy", "Status" => "Completed");
   // $arrOrders = array(
   //     "Order1001" => array("orderID" => "1001", "Items" => "Americano", "Status" => "New"),
    ////    "Order1002" => array("orderID" => "1002", "Items" => "Cookie", "Status" => "New"),
   //     "Order1003" => array("orderID" => "1003", "Items" => "Candy", "Status" => "Completed")
  //  );
   
  //  $keys = array_keys($arrOrders);
  //  for($i = 0; $i < count($arrOrders); $i++) {
  //      echo $keys[$i] . "{<br>";
   //     foreach($arrOrders[$keys[$i]] as $key => $value) {
   //         echo $key . " : " . $value . "<br>";
    //    }
    //    echo "}<br>";
   // }
   
   // $arrNewOrders = array();
    //$arrCompletedOrders = array();
  
    //function checkStatus($arrOrders){
      //  foreach($arrOrders as $Orders){
        //    if($Orders.status => "New"){
          //      $arrNewOrders.apppend($Orders);
            //}
            //else{
              //  $arrCompletedOrders.append($Orders);
           // }
        //}
        //echo '<pre>'; print_r($arrNewOrders); echo '</pre';
    //}
  
  
  
  
  
  
  
  
  
    // function checkStatus($orderID, $status){
     //   if($status = 'NEW'){
       //     $arrNewOrders = array("OrderID" => $orderID, "Status" => $status);
        //}
        //return$arrNewOrders;
       //echo '<pre>'; print_r($arrNewOrders); echo '</pre>';
    //}
    ?>






    