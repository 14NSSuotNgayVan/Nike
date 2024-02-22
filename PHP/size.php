<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['productid'])) {
        $productid = $_GET["productid"];

        $sql = "SELECT * FROM size WHERE productid = '$productid'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $size = array();
            while ($row = $result->fetch_assoc()) {
                $row['size'] = (int)($row['size']);
                $row['quantity']= (int)($row['quantity']);
                $size[] = $row;
            }
            echo json_encode($size);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Thiếu tham số']);
    }
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $productid = $data["productid"];
    $size = $data["size"];
    $quantity = $data["quantity"];

    $sql = "UPDATE size SET  `quantity` = '$quantity' WHERE `size`.`productid` = '$productid' AND `size` = $size";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Sửa thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi sửa"]);
    }
}
//  elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
//     $data = json_decode(file_get_contents("php://input"), true);
//     if (isset($_GET['productid'])) {
//         $productid = $_GET["productid"];
//         $size = $_GET["size"];


//         $sql = "DELETE FROM size WHERE `size`.`productid` = '$productid' AND `size` = $size";
//         $result = $conn->query($sql);
//         if ($result) {
//             echo json_encode(["success" => true, "message" => "Xóa thành công."]);
//         } else {
//             echo json_encode(["success" => false, "message" => "Lỗi khi xóa"]);
//         }
//     } else  echo json_encode(['error' => 'Thiếu tham số']);
// } else {
//     echo json_encode(["error" => "Phương thức HTTP không được hỗ trợ"]);
// }
$conn->close();
