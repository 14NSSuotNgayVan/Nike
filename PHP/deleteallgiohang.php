<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
        $sql = "DELETE FROM giohang";
        $result = $conn->query($sql);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Xóa thành công."]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi xóa sản phẩm"]);
        }
} else {
    echo json_encode(["error" => "Phương thức HTTP không được hỗ trợ"]);
}
$conn->close();
?>