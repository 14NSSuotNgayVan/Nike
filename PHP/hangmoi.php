<?php
require './connection.php';
$sql = "SELECT * FROM giay where DATEDIFF(CURRENT_TIMESTAMP,giay.dayadded) > 30";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $customers = array();
    while ($row = $result->fetch_assoc()) {
        $row['price'] = (int)$row['price'];
        $row['quantity'] = (int)$row['quantity'];
        $row['salequantity'] = (int)$row['salequantity'];
        $customers[] = $row;
    }
    echo json_encode($customers);
} else {
    echo "Không có mặt hàng mới.";
}

$conn->close();
?>