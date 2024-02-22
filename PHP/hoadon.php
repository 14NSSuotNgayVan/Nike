<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['id'])) {
        $userid = $_GET["id"];

        $sql = "SELECT * FROM hoadon WHERE id = $userid";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $giohang = array();
            while ($row = $result->fetch_assoc()) {
                $row['bill_id'] = (int)($row['bill_id']);
                $row['id'] = (int)($row['id']);
                $giohang[] = $row;
            }
            echo json_encode($giohang);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Thiếu tham số']);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $userid = $data["id"];
    $phone = $data["phone"];
    $address = $data["address"];
    $message = $data["message"];
    $date = $data["date"];

    $sql = "INSERT INTO hoadon ( `id`, `phone`, `address`, `message`,`date`) VALUES ( $userid, '$phone', '$address', '$message','$date');";
    $result = $conn->query($sql);
    
    $sql1 = "SELECT LAST_INSERT_ID() AS bill_id;";
    $result1 = $conn->query($sql1);
    if ($result && $result1->num_rows > 0) {
        $row = $result1->fetch_assoc();
        echo json_encode(["success" => true, "message" => "Thêm thành công.","bill_id"=>(int)$row["bill_id"]]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi thêm"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $bill_id = $data["bill_id"];
    $userid = $data["id"];
    $phone = $data["phone"];
    $address = $data["address"];
    $message = $data["message"];
    $date = $data["date"];

    $sql = "UPDATE hoadon SET  `id` = $userid, `phone` = '$phone', `address` = '$address', `message` = '$message', `date` = '$date' WHERE `hoadon`.`bill_id` = $bill_id;";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Sửa thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi sửa"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($_GET['id'])) {
        $bill_id = $_GET["id"];

        $sql = "DELETE FROM hoadon WHERE `hoadon`.`bill_id` = $bill_id";
        $result = $conn->query($sql);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Xóa thành công."]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi xóa"]);
        }
    } else  echo json_encode(['error' => 'Thiếu tham số']);
} else {
    echo json_encode(["error" => "Phương thức HTTP không được hỗ trợ"]);
}
$conn->close();
