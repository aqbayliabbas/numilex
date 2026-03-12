<?php
require_once('../config/db.php');
setApiHeaders();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $job_id = $_POST['job_id'] ?? null;
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($job_id) || empty($first_name) || empty($last_name) || empty($email) || empty($_FILES['cv'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields or CV file']);
        exit();
    }

    $cv = $_FILES['cv'];
    $ext = pathinfo($cv['name'], PATHINFO_EXTENSION);
    $newName = uniqid() . '_' . time() . '.' . $ext;
    $uploadDir = '../uploads/cvs/';
    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $uploadPath = $uploadDir . $newName;

    if (move_uploaded_file($cv['tmp_name'], $uploadPath)) {
        $stmt = $db->prepare('INSERT INTO applications (job_id, first_name, last_name, email, phone, cv_path, message) VALUES (?, ?, ?, ?, ?, ?, ?)');
        if ($stmt->execute([$job_id, $first_name, $last_name, $email, $phone, $newName, $message])) {
            echo json_encode(['success' => 'Application submitted successfully', 'id' => $db->lastInsertId()]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to save application to DB']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move CV upload']);
    }
} else if ($method === 'GET') {
    // Admin needs to see candidates. Join with jobs to see which job they applied for.
    $stmt = $db->query('SELECT a.*, j.title as job_title FROM applications a JOIN jobs j ON a.job_id = j.id ORDER BY a.applied_at DESC');
    $apps = $stmt->fetchAll();
    echo json_encode($apps);
} else if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID required']);
        exit();
    }

    // Optional: Delete file too
    $stmt = $db->prepare('SELECT cv_path FROM applications WHERE id = ?');
    $stmt->execute([$id]);
    $app = $stmt->fetch();
    if ($app) {
        $filePath = '../uploads/cvs/' . $app['cv_path'];
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    $stmt = $db->prepare('DELETE FROM applications WHERE id = ?');
    if ($stmt->execute([$id])) {
        echo json_encode(['success' => 'Application deleted']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete application']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
