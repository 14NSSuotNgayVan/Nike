<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT * FROM giay";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $customers = array();
        while ($row = $result->fetch_assoc()) {
            $customers[] = $row;
        }
        echo json_encode($customers);
    } else {
        echo json_encode([]);
    }
}elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $productid = $data["productid"];
    $quantity = $data["quantity"];
    $salequantity = $data["salequantity"];

    $sql = "UPDATE `giay` SET `salequantity` = $salequantity,`quantity` = $quantity WHERE `giay`.`productid` = '$productid';";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Sửa thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi sửa sản phẩm"]);
    }
}elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_GET['price'])) {
        $price = (float)$_GET["price"]/10000;

        $sql = "SELECT * FROM giay WHERE price= $price";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $giohang = array();
            while ($row = $result->fetch_assoc()) {
                $row['price'] = (int)$row['price'];
                $row['quantity'] = (int)$row['quantity'];
                $row['salequantity'] = (int)$row['salequantity'];
                $giohang[] = $row;
            }
            echo json_encode($giohang);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Thiếu tham số']);
    }
}

$conn->close();
?>