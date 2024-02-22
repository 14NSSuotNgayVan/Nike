<?php
require './connection.php';
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['name'])) {
        $username = $_GET["name"];

        $sql = "SELECT count(*) AS count FROM user WHERE`user`.`name` = '$username'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $customers = array();
            while ($row = $result->fetch_assoc()) {
                $row['count'] = (int)($row['count']);
                $customers[] = $row;
            }
            echo json_encode($customers[0]);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Thiếu tham số']);
    }
}else 
if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $password = $data["password"];
        $name = $data["name"];
        $email = $data["email"];

        $sql = $conn->prepare("SELECT *  FROM user WHERE`user`.`password` = ? AND `user`.`name`= ? AND `email` = ?;");
        $sql->bind_param("sss",$password,$name,$email);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $customers = array();
            while ($row = $result->fetch_assoc()) {
                $customers[] = $row;
            }
            echo json_encode([$customers[0]]);
        } else {
            echo json_encode([]);}
}
?>