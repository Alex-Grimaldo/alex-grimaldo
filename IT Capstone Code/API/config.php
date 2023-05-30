<?php
	header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    // Info above is for CORS

    // connection information
	$host_name = 'db5010289523.hosting-data.io';
    $database = 'dbs8719432';
    $user_name = 'dbu5401303';
    $password = 'Mickey2022!';

    // define your conneciton here
    $conBean = new mysqli($host_name, $user_name, $password, $database);

    // function to return a GUID as a string
    function guidv4(){
        if (function_exists('com_create_guid') === true)
            return trim(com_create_guid(), '{}');

        $data = openssl_random_pseudo_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    //function to create a new order
    function addOrder($strSquareOrder,$strCustomer){
        global $conBean;
       
        $strOrderID = guidv4();
        $strQuery = "INSERT INTO tblOrders VALUES (?,?,SYSDATE(),null,null,'NEW',?)";
      	// Check Connection
        if ($conBean->connect_errno) {
            $blnError = "true";
            $strErrorMessage = $conBean->connect_error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
            exit();
        }
      
        if ($conBean->ping()) {
        } else {
            $blnError = "true";
            $strErrorMessage = $conBean->error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
        }
      
		 $statBean = $conBean->prepare($strQuery);

		 // Bind Parameters
		 $statBean->bind_param('sss', $strOrderID,$strSquareOrder,$strCustomer);
         if($statBean->execute()){
            return '{"OrderID":"'.$strOrderID.'"}';
         } else {
            return '{"Error":"Order Not Created"}';
         }
         $statBean->close();
    }

    //function to update an order
    function updateOrder($orderID,$status){
        global $conBean;
        $strQuery = "";
        if($status == 'COMPLETE'){
            $strQuery = "UPDATE tblOrders SET CompleteDateTime = SYSDATE(), PickupDateTime = null,  Status = 'COMPLETE' WHERE OrderID = ?";
        } elseif($status == 'PICKEDUP'){
            $strQuery = "UPDATE tblOrders SET PickupDateTime = SYSDATE(),  Status = 'PICKEDUP' WHERE OrderID = ?";
        } elseif($status == 'NEW'){
            $strQuery = "UPDATE tblOrders SET CompleteDateTime = null, PickupDateTime = null,  Status = 'NEW' WHERE OrderID = ?";
        } elseif($status == 'CANCEL'){
            $strQuery = "UPDATE tblOrders SET CompleteDateTime = null, PickupDateTime = null,  Status = 'CANCEL' WHERE OrderID = ?";
        } elseif($status == 'RETURN'){
            $strQuery = "UPDATE tblOrders SET CompleteDateTime = null, PickupDateTime = null,  Status = 'RETURN' WHERE OrderID = ?";
        } else {
            return '{"Error":"Status Not Supported"}';
        }
        // Check Connection
        if ($conBean->connect_errno) {
            $blnError = "true";
            $strErrorMessage = $conBean->connect_error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
            exit();
        }
    
        if ($conBean->ping()) {
        } else {
            $blnError = "true";
            $strErrorMessage = $conBean->error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
        }
    
        $statBean = $conBean->prepare($strQuery);

        // Bind Parameters
        $statBean->bind_param('s', $orderID);
        if($statBean->execute()){
            return '{"Outcome":"Order Updated"}';
        } else {
            return '{"Error":"Order Not Updated"}';
        }

        
        $statBean->close();
        
    }

    //function to delete an order
    function deleteOrder($orderID){
        global $conBean;
            $strQuery = "DELETE FROM tblOrders WHERE OrderID = ?";
            // Check Connection
            if ($conBean->connect_errno) {
                $blnError = "true";
                $strErrorMessage = $conBean->connect_error;
                $arrError = array('error' => $strErrorMessage);
                echo json_encode($arrError);
                exit();
            }
        
            if ($conBean->ping()) {
            } else {
                $blnError = "true";
                $strErrorMessage = $conBean->error;
                $arrError = array('error' => $strErrorMessage);
                echo json_encode($arrError);
            }
        
            $statBean = $conBean->prepare($strQuery);

            // Bind Parameters
            $statBean->bind_param('s', $sessionID);
            if($statBean->execute()){
                return '{"Outcome":"Order Deleted"}';
            } else {
                return '{"Error":"Order Not Deleted"}';
            }
            $statBean->close();
        
    }
    
    //function to get orders
    function getOrders($orderID,$status){
        global $conBean;
        if($orderID == null){
            if($status == null){
                $strQuery = "SELECT * FROM tblOrders";
            } else {
                $strQuery = "SELECT * FROM tblOrders WHERE Status = ?";
            }
            
        } else {
            $strQuery = "SELECT * FROM tblOrders WHERE OrderID = ?";
        }
      	// Check Connection
        if ($conBean->connect_errno) {
            $blnError = "true";
            $strErrorMessage = $conBean->connect_error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
            exit();
        }
      
        if ($conBean->ping()) {
        } else {
            $blnError = "true";
            $strErrorMessage = $conBean->error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
        }
      
		 $statBean = $conBean->prepare($strQuery);

		 // Bind Parameters
         if($orderID != null){
            $statBean->bind_param('s', $orderID);
         } elseif($status != null){
            $statBean->bind_param('s', $status);
         }

		 
         $statBean->execute();      
         $result = $statBean->get_result();
         $myArray = array();

         while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                 $myArray[] = $row;
         }
         echo json_encode($myArray);
            
         $statBean->close();
    }

    function getOrderItems($orderID){
        global $conBean;
        $strQuery = "SELECT * FROM tblOrderItems WHERE OrderID = ?";
      	// Check Connection
        if ($conBean->connect_errno) {
            $blnError = "true";
            $strErrorMessage = $conBean->connect_error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
            exit();
        }
      
        if ($conBean->ping()) {
        } else {
            $blnError = "true";
            $strErrorMessage = $conBean->error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
        }
      
		 $statBean = $conBean->prepare($strQuery);

		 // Bind Parameters
        $statBean->bind_param('s', $orderID);
        

		 
         $statBean->execute();      
         $result = $statBean->get_result();
         $myArray = array();

         while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                 $myArray[] = $row;
         }
         echo json_encode($myArray);
            
         $statBean->close();
    }

    function addOrderItem($strOrderID,$strDescription,$intQuantity){
        global $conBean;
       
        $strItemID = guidv4();
        $strQuery = "INSERT INTO tblOrderItems VALUES (?,?,?,?)";
      	// Check Connection
        if ($conBean->connect_errno) {
            $blnError = "true";
            $strErrorMessage = $conBean->connect_error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
            exit();
        }
      
        if ($conBean->ping()) {
        } else {
            $blnError = "true";
            $strErrorMessage = $conBean->error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
        }
      
		 $statBean = $conBean->prepare($strQuery);

		 // Bind Parameters
		 $statBean->bind_param('ssss', $strItemID,$strOrderID,$strDescription,$intQuantity);
         if($statBean->execute()){
            return '{"ItemID":"'.$strItemID.'"}';
         } else {
            return '{"Error":"Order Not Created"}';
         }
         $statBean->close();
    }
?>