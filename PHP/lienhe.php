<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "GET") {
        $sql = "SELECT * FROM lienhe WHERE";
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
}else if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $name = $data["name"];
        $email = $data["email"];
        $phone = $data["phone"];
        $field = $data["field"];
        $message = $data["message"];

        $sql = "INSERT INTO `lienhe` (`id`, `name`, `email`, `field`, `phone`, `message`) VALUES (NULL, '$name', '$email', '$field', '$phone', '$message');";
        $result = $conn->query($sql);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Sửa thành công."]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi sửa sản phẩm"]);
        }

}

$conn->close();
?>