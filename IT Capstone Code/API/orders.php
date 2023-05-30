<?php
    require('config.php'); 
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $strSquareOrder = $_POST['SquareOrder'];
        $strCustomer = $_POST['Customer'];

        $strSquareOrder = strip_tags($strSquareOrder);
        $strCustomer = strip_tags($strCustomer);

        echo addOrder($strSquareOrder,$strCustomer);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $put_vars;
        parse_str(file_get_contents("php://input"),$put_vars);
        $orderID = $put_vars['OrderID'];
        $status = $put_vars['Status'];
        $orderID = strip_tags($orderID);
        $status = strip_tags($status);
        echo updateOrder($orderID,$status);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $delete_vars;
        parse_str(file_get_contents("php://input"),$delete_vars);
        $orderID = $delete_vars['OrderID'];
        $orderID = strip_tags($orderID);
        echo deleteOrder($orderID);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $orderID = $_GET['OrderID'];
        $status = $_GET['Status'];

        $orderID = strip_tags($orderID);
        $status = strip_tags($status);
        echo getOrders($orderID,$status);
    }
    
?>