<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['id'])) {
        $userid = $_GET["id"];

        $sql = "SELECT * FROM giohang WHERE`giohang`.`id` = $userid";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $giohang = array();
            while ($row = $result->fetch_assoc()) {
                $row['id'] = (int)($row['id']);
                $row['quantity'] = (int)($row['quantity']);
                $row['size'] = (int)($row['size']);
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
    $productid = $data["productid"];
    $userid = $data["id"];
    $quantity = $data["quantity"];
    $size = $data["size"];


    $sql = "INSERT INTO `giohang` (`id`, `productid`, `quantity`,`size`) VALUES ($userid,'$productid', $quantity,$size);";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Thêm thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi thêm sản phẩm"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $productid = $data["productid"];
    $userid = $data["id"];
    $quantity = $data["quantity"];
    $size = $data["size"];

    $sql = "UPDATE `giohang` SET `quantity` = $quantity WHERE `giohang`.`id` = $userid  AND `giohang`.`productid` = '$productid' AND `size` = $size;";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Sửa thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi sửa sản phẩm"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($_GET['id']) && isset($_GET['productid']) && isset($_GET['size'])) {
        $productid = $_GET["productid"];
        $userid = $_GET["id"];
        $size = $_GET["size"];

        $sql = "DELETE FROM giohang WHERE `giohang`.`id` = $userid AND `giohang`.`productid` = '$productid' AND `size` = $size;";
        $result = $conn->query($sql);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Xóa thành công."]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi xóa sản phẩm"]);
        }
    } else  echo json_encode(['error' => 'Thiếu tham số']);
} else {
    echo json_encode(["error" => "Phương thức HTTP không được hỗ trợ"]);
}
$conn->close();
?>
