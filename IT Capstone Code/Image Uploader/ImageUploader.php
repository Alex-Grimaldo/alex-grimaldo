<?php
    require('configImageUploader.php');
    if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
        $Image = $_POST['Image']; 
        $Image= strip_tags($Image);
        echo addImage($Image); 
    } 
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') { 
        $put_vars; parse_str(file_get_contents("php://input"),
        $put_vars); 
        $orderID = $put_vars['OrderID']; 
        $status = $put_vars['Status']; 
        $orderID = strip_tags($orderID); 
        $status = strip_tags($status); 
        //echo ($orderID,$status); 
    } 
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') { 
        $delete_vars; 
        parse_str(file_get_contents("php://input"),
        $delete_vars); 
        $Image = $delete_vars['Image']; 
        $Image = strip_tags($Image); 
        echo deleteImage($Image); 
    } 
    if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
        //$Image = $_GET['Image']; 
        //$Image = strip_tags($Image); 
        echo getImages(); 
        //return isset($lookup_table[$Image]) ? $lookup_table[$Image] : null;
    } 
    ?>
