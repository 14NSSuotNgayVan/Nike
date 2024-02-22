<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['id'])) {
        $userid = $_GET["id"];

        $sql = "SELECT * FROM user WHERE`user`.`id` = $userid";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $customers = array();
            while ($row = $result->fetch_assoc()) {
                $customers[] = $row;
            }
            echo json_encode($customers[0]);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Thiếu tham số']);
    }
}else if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);

        $username = $data["username"];
        $displayname = $data["displayname"];
        $email = $data["email"];
        $phone = $data["phone"];
        $address = $data["address"];
        $password = $data["password"];

        $sql = "INSERT INTO `user` (`id`, `name`, `displayname`, `email`, `address`, `phone`, `password`) VALUES (NULL, '$username', '$displayname', '$email', '$address', '$phone', '$password');";
        $result = $conn->query($sql);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Thêm thành công."]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi kh khi thêm"]);
        }

}elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data["username"];
    $password = $data["password"];

    $sql = "UPDATE `user` SET `password` = '$password' WHERE `user`.`name` = '$username';";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Sửa thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi sửa"]);
    }
}

$conn->close();
?>