<?php
session_start();
require_once('../config/db.php');

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = 'Both username and password are required';
    } else {
        $stmt = $db->prepare('SELECT * FROM admins WHERE username = ?');
        $stmt->execute([$username]);
        $admin = $stmt->fetch();

        error_log("Attempting login for user: $username");
        if ($admin && password_verify($password, $admin['password'])) {
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['username'] = $admin['username'];
            header('Location: dashboard.php');
            exit();
        } else {
            // For simple case as user requested: Numilex202606
            if ($username === 'Numilex202606' && $password === 'Numilex202606') {
                $_SESSION['admin_id'] = 1;
                $_SESSION['username'] = 'Numilex202606';
                header('Location: dashboard.php');
                exit();
            }
            $error = 'Invalid credentials';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Admin Login - Numilex</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        body { background: #0D1321; color: white; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; }
        .card { width: 400px; border-radius: 12px; background: #161D2F; border: 1px solid #2D364D; }
        .btn-accent { background: #FF1E26; color: white; border: none; font-weight: bold; }
        .btn-accent:hover { background: #E61B22; }
    </style>
</head>
<body>
<div class="card p-4 shadow-lg">
    <div class="text-center mb-4">
        <h3 class="fw-bold">Numilex Admin</h3>
        <p class="text-muted small">Access the management panel</p>
    </div>
    <?php if ($error): ?>
        <div class="alert alert-danger py-2 small"><?php echo $error; ?></div>
    <?php endif; ?>
    <form method="POST">
        <div class="mb-3">
            <label class="form-label small">Username</label>
            <input type="text" name="username" class="form-control bg-dark border-secondary text-white" value="Numilex202606">
        </div>
        <div class="mb-3">
            <label class="form-label small">Password</label>
            <input type="password" name="password" class="form-control bg-dark border-secondary text-white" value="Numilex202606">
        </div>
        <button type="submit" class="btn btn-accent w-100 py-2">Login</button>
    </form>
</div>
</body>
</html>
