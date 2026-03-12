<?php
require_once('../config/db.php');
setApiHeaders();

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $first_name = $input['first_name'] ?? '';
    $last_name = $input['last_name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $subject = $input['subject'] ?? '';
    $message = $input['message'] ?? '';

    if (empty($first_name) || empty($last_name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit();
    }

    $stmt = $db->prepare('INSERT INTO devis (first_name, last_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)');
    if ($stmt->execute([$first_name, $last_name, $email, $phone, $subject, $message])) {
        echo json_encode(['success' => 'Devis received successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save devis']);
    }
} else if ($method === 'GET') {
    $stmt = $db->query('SELECT * FROM devis ORDER BY created_at DESC');
    $devis = $stmt->fetchAll();
    echo json_encode($devis);
} else if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        exit();
    }
    $stmt = $db->prepare('DELETE FROM devis WHERE id = ?');
    if ($stmt->execute([$id])) {
        echo json_encode(['success' => 'Devis deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete devis']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
