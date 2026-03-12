<?php
require_once('../config/db.php');
setApiHeaders();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $db->prepare('SELECT * FROM jobs WHERE id = ?');
        $stmt->execute([$id]);
        $job = $stmt->fetch();
        if ($job) {
            echo json_encode($job);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Job not found']);
        }
    } else {
        $stmt = $db->query('SELECT * FROM jobs ORDER BY posted_at DESC');
        $jobs = $stmt->fetchAll();
        echo json_encode($jobs);
    }
} else if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit();
    }

    $title = $input['title'] ?? '';
    $category = $input['category'] ?? '';
    $description = $input['description'] ?? '';
    $full_details = $input['full_details'] ?? '';
    $location = $input['location'] ?? 'Remote';
    $salary = $input['salary'] ?? 'À discuter';

    if (empty($title) || empty($category) || empty($description)) {
        http_response_code(400);
        echo json_encode(['error' => 'Title, Category and Description are mandatory']);
        exit();
    }

    $stmt = $db->prepare('INSERT INTO jobs (title, category, description, full_details, location, salary) VALUES (?, ?, ?, ?, ?, ?)');
    if ($stmt->execute([$title, $category, $description, $full_details, $location, $salary])) {
        echo json_encode(['success' => 'Job created successfully', 'id' => $db->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create job']);
    }
} else if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $_GET['id'] ?? $input['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        exit();
    }

    $title = $input['title'] ?? '';
    $category = $input['category'] ?? '';
    $description = $input['description'] ?? '';
    $full_details = $input['full_details'] ?? '';
    $location = $input['location'] ?? '';
    $salary = $input['salary'] ?? '';

    $stmt = $db->prepare('UPDATE jobs SET title = ?, category = ?, description = ?, full_details = ?, location = ?, salary = ? WHERE id = ?');
    if ($stmt->execute([$title, $category, $description, $full_details, $location, $salary, $id])) {
        echo json_encode(['success' => 'Job updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update job']);
    }
} else if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        exit();
    }

    $stmt = $db->prepare('DELETE FROM jobs WHERE id = ?');
    if ($stmt->execute([$id])) {
        echo json_encode(['success' => 'Job deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete job']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
