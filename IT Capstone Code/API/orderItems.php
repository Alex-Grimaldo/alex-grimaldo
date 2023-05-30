<?php
    require('config.php'); 
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $strOrderID = $_POST['OrderID'];
        $strDescription = $_POST['Description'];
        $intQuantity = $_POST['Quantity'];

        $strOrderID = strip_tags($strOrderID);
        $strDescription = strip_tags($strDescription);
        $intQuantity = strip_tags($intQuantity);

        echo addOrder($strOrderID,$strDescription,$intQuantity);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $orderID = $_GET['OrderID'];

        $orderID = strip_tags($orderID);
        echo getOrderItems($orderID);
    }
    
?>