<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['bill_id'])) {
        $bill_id = $_GET["bill_id"];

        $sql = "SELECT * FROM chitiethoadon WHERE bill_id = $bill_id";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $giohang = array();
            while ($row = $result->fetch_assoc()) {
                $row['bill_id'] = (int)($row['bill_id']);
                $row['quantity'] = (int)($row['quantity']);
                $row['size'] = (int)($row['size']);

                $giohang[] = $row;
            }
            echo json_encode($giohang);
        } else {
            echo json_encode(["success" => false, "message" => "Hóa đơn hàng trống"]);
        }
    } else {
        echo json_encode(['error' => 'Thiếu tham số']);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $bill_id = $data["bill_id"];
    $productid  = $data["productid"];
    $quantity = $data["quantity"];
    $size = $data["size"];

    $sql = "INSERT INTO chitiethoadon (`detailbill_id`, `bill_id`, `productid`, `quantity`,`size`) VALUES ( NULL,$bill_id, '$productid', $quantity,$size);";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Thêm thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi thêm"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $bill_id = $data["bill_id"];
    $productid  = $data["productid"];
    $quantity = $data["quantity"];
    $size = $data["size"];

    $sql = "UPDATE chitiethoadon SET  `quantity` = $quantity WHERE `chitiethoadon`.`bill_id` = $bill_id AND `productid` = '$productid' AND `size` = $size;";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Sửa thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi sửa"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($_GET['id']) && isset($_GET['productid'])) {
        $bill_id = $data["bill_id"];

        $sql = "DELETE FROM chitiethoadon WHERE `chitiethoadon`.`bill_id` = $bill_id";
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
