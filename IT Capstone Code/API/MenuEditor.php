<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    // Info above is for CORS
    // connection information
    $host_name = '';
    $database = '';
    $user_name = '';
    $password = '';

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
    
    //HTTP create Image
    function addImage(){
        global $conBean;
        $strImageID = guidv4();
        $strQuery = "INSERT INTO ScrSvrImages VALUES (?,?)";
       
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
         $statBean->bind_param('sss', $strImageID,$strstrImage);
         if($statBean->execute()){
            return '{"ImageID":"'.$strImageID.'"}';
         } else {
            return '{"Error":"Image not saved."}';
         }
         $statBean->close();
    }
    //HTTP create time settings
    function addTimeSetting(){
        global $conBean;
        $strQuery = "INSERT INTO Settings VALUES (?,?)";
       
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
         $statBean->bind_param('ss', $StartHour,$EndHour);
         if($statBean->execute()){
            return ' Time Settings saved.';
         } else {
            return '{"Error":"Image not saved."}';
         }
         $statBean->close();
    }

    //HTTP update
    function updateTimeSettings($StartHour,$EndHour){
        global $conBean;
        $strQuery = "UPDATE Settings set StartHour=?, EndHour=?";

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
        $statBean->bind_param('ss', $StartHour,$EndHour);
        if($statBean->execute()){
            return '{"Outcome":"Time setting saved."}';
        } else {
            return '{"Error":"Order Not Updated"}';
        }
        $statBean->close();
    }
    
    //HTTP delete Image
    function deleteImage($strImageID){
        global $conBean;
            $strQuery = "DELETE FROM ScrSvrImages WHERE ImageID = ?";
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
            $statBean->bind_param('s', $strImageID);
            if($statBean->execute()){
                return '{"Outcome":"Image Deleted}';
            } else {
                return '{"Error":"Order Not Deleted"}';
            }
            $statBean->close();
    }
    //HTTP read Images
    function getImages(){
        global $conBean;
        $strQuery = "SELECT * FROM ScrSvrImages";
           
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
         /* is this neccessary for pulling all images?
         if($orderID != null){
            $statBean->bind_param('s', $orderID);
         } elseif($status != null){
            $statBean->bind_param('s', $status);
         }
         */
         $statBean->execute();      
         $result = $statBean->get_result();
         /*
         $myArray = array();
         while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                 $myArray[] = $row;
         }
         */
         echo json_encode($result);
         $statBean->close();
    }

    //HTTP read Time settings
    function getTimeSettings(){
        global $conBean;
        $strQuery = "SELECT * FROM Settings";
           
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
         /* is this neccessary for pulling all images?
         if($orderID != null){
            $statBean->bind_param('s', $orderID);
         } elseif($status != null){
            $statBean->bind_param('s', $status);
         }
         */
         $statBean->execute();      
         $result = $statBean->get_result();
         /*
         $myArray = array();
         while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                 $myArray[] = $row;
         }
         */
         echo json_encode($result);
         $statBean->close();
    }
?>