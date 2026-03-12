<?php
require_once('../config/db.php');
setApiHeaders();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handling creation of new blog via JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON input']);
        exit();
    }

    $category = $input['category'] ?? 'Tous';
    $title = $input['title'] ?? '';
    $image_url = $input['image_url'] ?? '';
    $read_time = $input['read_time'] ?? '5 min';
    $description = $input['description'] ?? '';
    $content = $input['content'] ?? '';
    $seo_tags = $input['seo_tags'] ?? '';

    if (empty($title) || empty($content)) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and Content are mandatory']);
        exit();
    }

    $stmt = $db->prepare('INSERT INTO blogs (category, title, image_url, read_time, description, content, seo_tags) VALUES (?, ?, ?, ?, ?, ?, ?)');
    if ($stmt->execute([$category, $title, $image_url, $read_time, $description, $content, $seo_tags])) {
        echo json_encode(['success' => 'Blog article published successfully', 'id' => $db->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'An error occurred while saving the article']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Handling update of existing blog via JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $_GET['id'] ?? $input['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required for update']);
        exit();
    }

    $category = $input['category'] ?? 'Tous';
    $title = $input['title'] ?? '';
    $image_url = $input['image_url'] ?? '';
    $read_time = $input['read_time'] ?? '5 min';
    $description = $input['description'] ?? '';
    $content = $input['content'] ?? '';
    $seo_tags = $input['seo_tags'] ?? '';

    if (empty($title) || empty($content)) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and Content are mandatory']);
        exit();
    }

    $stmt = $db->prepare('UPDATE blogs SET category = ?, title = ?, image_url = ?, read_time = ?, description = ?, content = ?, seo_tags = ? WHERE id = ?');
    if ($stmt->execute([$category, $title, $image_url, $read_time, $description, $content, $seo_tags, $id])) {
        echo json_encode(['success' => 'Blog article updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'An error occurred while updating the article']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required for deletion']);
        exit();
    }

    $stmt = $db->prepare('DELETE FROM blogs WHERE id = ?');
    if ($stmt->execute([$id])) {
        echo json_encode(['success' => 'Blog article deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'An error occurred while deleting the article']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $db->prepare('SELECT * FROM blogs WHERE id = ?');
        $stmt->execute([$id]);
        $blog = $stmt->fetch();
        if ($blog) {
            echo json_encode($blog);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Blog not found']);
        }
    } else {
        $category = $_GET['category'] ?? null;
        if ($category && $category !== 'Tous') {
            $stmt = $db->prepare('SELECT * FROM blogs WHERE category = ? ORDER BY posted_at DESC');
            $stmt->execute([$category]);
        } else {
            $stmt = $db->query('SELECT * FROM blogs ORDER BY posted_at DESC');
        }
        $blogs = $stmt->fetchAll();
        echo json_encode($blogs);
    }
} else {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'UNKNOWN';
    http_response_code(405);
    echo json_encode(['error' => 'Method ' . $method . ' Not Allowed']);
}
?>
