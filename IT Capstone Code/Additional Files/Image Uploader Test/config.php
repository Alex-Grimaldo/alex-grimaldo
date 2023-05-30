<?php  
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

    $sname = "localhost";
    $db_name = "test_db";
    $uname = "root";
    $password = "";

    $conn = mysqli_connect($sname, $uname, $password, $db_name);

    if (!$conn) {
        echo "Connection failed!";
        exit();
    }
    /* function getImages(){
        global $conn;
        $strQuery = "SELECT * FROM images";
           
        // Check Connection
        if ($conn->connect_error) {
            $blnError = "true";
            $strErrorMessage = $conn->connect_error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
            exit();
        }
        if ($conn->ping()) {
        } else {
            $blnError = "true";
            $strErrorMessage = $conn->error;
            $arrError = array('error' => $strErrorMessage);
            echo json_encode($arrError);
        }
         $statBean = $conn->prepare($strQuery);
         $statBean->execute();      
         $result = $statBean->get_result();
         echo json_encode($result);
         $statBean->close();
    } */
?>