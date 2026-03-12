<?php
session_start();
require_once('../config/db.php');

if (!isset($_SESSION['admin_id'])) {
    header('Location: login.php');
    exit();
}

$active_tab = $_GET['tab'] ?? 'devis';
$action = $_GET['action'] ?? null;
$id = $_GET['id'] ?? null;
$msg = $_GET['msg'] ?? '';

// Handle actions (CRUD)
if ($action === 'delete') {
    $table = $active_tab;
    if ($table === 'applications') $table = 'applications';
    elseif ($table === 'blogs') $table = 'blogs';
    elseif ($table === 'jobs') $table = 'jobs';
    elseif ($table === 'devis') $table = 'devis';

    $stmt = $db->prepare("DELETE FROM $table WHERE id = ?");
    $stmt->execute([$id]);
    header("Location: dashboard.php?tab=$active_tab&msg=deleted");
    exit();
}

// Handle Add/Edit for Blogs and Jobs
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add_blog'])) {
        $stmt = $db->prepare('INSERT INTO blogs (category, title, read_time, description, content) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$_POST['category'], $_POST['title'], $_POST['read_time'], $_POST['description'], $_POST['content']]);
        header('Location: dashboard.php?tab=blogs&msg=added');
        exit();
    }
    if (isset($_POST['add_job'])) {
        $stmt = $db->prepare('INSERT INTO jobs (title, category, description, full_details, location, salary) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$_POST['title'], $_POST['category'], $_POST['description'], $_POST['full_details'], $_POST['location'], $_POST['salary']]);
        header('Location: dashboard.php?tab=jobs&msg=added');
        exit();
    }
}

// Data fetching
$data = [];
if ($active_tab === 'devis') $data = $db->query('SELECT * FROM devis ORDER BY created_at DESC')->fetchAll();
elseif ($active_tab === 'blogs') $data = $db->query('SELECT * FROM blogs ORDER BY posted_at DESC')->fetchAll();
elseif ($active_tab === 'jobs') $data = $db->query('SELECT * FROM jobs ORDER BY posted_at DESC')->fetchAll();
elseif ($active_tab === 'applications') $data = $db->query('SELECT a.*, j.title as job_title FROM applications a JOIN jobs j ON a.job_id = j.id ORDER BY applied_at DESC')->fetchAll();

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Numilex Admin Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        body { background: #F8F9FA; color: #0D1321; font-family: 'Poppins', sans-serif; display: flex; min-height: 100vh; overflow-x: hidden; }
        .sidebar { background: #0D1321; color: white; width: 260px; padding: 20px; flex-shrink: 0; }
        .sidebar-link { color: rgba(255,255,255,0.7); text-decoration: none; padding: 12px 16px; display: block; border-radius: 8px; margin-bottom: 4px; transition: all 0.2s; }
        .sidebar-link:hover, .sidebar-link.active { background: #161D2F; color: #FF1E26; }
        .main-content { flex-grow: 1; padding: 40px; background: #F8F9FA; }
        .navbar-brand { font-weight: 800; color: #FF1E26 !important; margin-bottom: 2rem; display: block; }
        .card { border-radius: 12px; border: 1px solid #E9ECEF; box-shadow: 0 4px 12px rgba(13,19,33,0.03); }
        .btn-accent { background: #FF1E26; color: white; border-radius: 8px; font-weight: 600; padding: 10px 20px; transition: all 0.2s; }
        .btn-accent:hover { background: #E61B22; transform: translateY(-1px); }
        .badge-status { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; }
        .badge-devis { background: #FFF1F2; color: #FF1E26; }
        .badge-app { background: #E9FCE9; color: #198754; }
        .table img { width: 50px; border-radius: 6px; }
        .empty-state { text-align: center; padding: 60px; color: #5E6772; }
    </style>
</head>
<body>

<aside class="sidebar">
    <a href="dashboard.php" class="navbar-brand fs-4">Numilex Admin</a>
    <nav>
        <a href="?tab=devis" class="sidebar-link <?php echo $active_tab === 'devis' ? 'active' : ''; ?>">Collaboration Requests (Devis)</a>
        <a href="?tab=blogs" class="sidebar-link <?php echo $active_tab === 'blogs' ? 'active' : ''; ?>">Blog Articles</a>
        <a href="?tab=jobs" class="sidebar-link <?php echo $active_tab === 'jobs' ? 'active' : ''; ?>">Job Offers</a>
        <a href="?tab=applications" class="sidebar-link <?php echo $active_tab === 'applications' ? 'active' : ''; ?>">Candidats Applications</a>
        <hr class="my-4 opacity-50">
        <a href="logout.php" class="sidebar-link text-white-50">Logout</a>
    </nav>
</aside>

<main class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-5">
        <div>
            <h1 class="fw-bold fs-3 mb-1"><?php echo ucfirst($active_tab); ?> Hub</h1>
            <p class="text-muted mb-0">Manage your digital assets and requests from this panel.</p>
        </div>
        <?php if ($active_tab === 'blogs'): ?>
            <button class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#blogModal">New Article</button>
        <?php elseif ($active_tab === 'jobs'): ?>
            <button class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#jobModal">New Career Ad</button>
        <?php endif; ?>
    </div>

    <?php if ($msg === 'deleted'): ?>
        <div class="alert alert-success">Item deleted successfully.</div>
    <?php endif; ?>

    <div class="card bg-white p-0">
        <div class="table-responsive">
            <table class="table table-hover mb-0 align-middle">
                <?php if ($active_tab === 'devis'): ?>
                    <thead class="table-light">
                        <tr>
                            <th class="ps-4">Client</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Received At</th>
                            <th class="pe-4 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach($data as $row): ?>
                        <tr>
                            <td class="ps-4">
                                <span class="fw-bold"><?php echo $row['first_name'].' '.$row['last_name']; ?></span><br>
                                <small class="text-muted"><?php echo $row['email']; ?> | <?php echo $row['phone']; ?></small>
                            </td>
                            <td><span class="badge-status badge-devis"><?php echo $row['subject']; ?></span></td>
                            <td class="small text-truncate" style="max-width: 300px;"><?php echo $row['message']; ?></td>
                            <td class="small"><?php echo date('d M, Y H:i', strtotime($row['created_at'])); ?></td>
                            <td class="pe-4 text-end">
                                <a href="?tab=devis&action=delete&id=<?php echo $row['id']; ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Silently delete this lead?')">Delete</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                <?php elseif ($active_tab === 'blogs'): ?>
                    <thead class="table-light">
                        <tr>
                            <th class="ps-4">Article</th>
                            <th>Category</th>
                            <th>Posted At</th>
                            <th class="pe-4 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach($data as $row): ?>
                        <tr>
                            <td class="ps-4">
                                <span class="fw-bold"><?php echo $row['title']; ?></span><br>
                                <small class="text-muted"><?php echo $row['read_time']; ?> read</small>
                            </td>
                            <td><span class="badge-status badge-devis"><?php echo $row['category']; ?></span></td>
                            <td class="small"><?php echo $row['posted_at']; ?></td>
                            <td class="pe-4 text-end">
                                <a href="?tab=blogs&action=delete&id=<?php echo $row['id']; ?>" class="btn btn-sm btn-outline-danger">Delete</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                <?php elseif ($active_tab === 'jobs'): ?>
                    <thead class="table-light">
                        <tr>
                            <th class="ps-4">Position</th>
                            <th>Category</th>
                            <th>Location/Salary</th>
                            <th class="pe-4 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach($data as $row): ?>
                        <tr>
                            <td class="ps-4">
                                <span class="fw-bold"><?php echo $row['title']; ?></span>
                            </td>
                            <td><span class="badge-status badge-app"><?php echo $row['category']; ?></span></td>
                            <td class="small text-muted"><?php echo $row['location']; ?> · <?php echo $row['salary']; ?></td>
                            <td class="pe-4 text-end">
                                <a href="?tab=jobs&action=delete&id=<?php echo $row['id']; ?>" class="btn btn-sm btn-outline-danger">Delete</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                <?php elseif ($active_tab === 'applications'): ?>
                    <thead class="table-light">
                        <tr>
                            <th class="ps-4">Candidat</th>
                            <th>Job Offer</th>
                            <th>CV/Files</th>
                            <th>Applied</th>
                            <th class="pe-4 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach($data as $row): ?>
                        <tr>
                            <td class="ps-4">
                                <span class="fw-bold"><?php echo $row['first_name'].' '.$row['last_name']; ?></span><br>
                                <small class="text-muted"><?php echo $row['email']; ?></small>
                            </td>
                            <td><span class="badge-status badge-app"><?php echo $row['job_title']; ?></span></td>
                            <td><a href="../uploads/cvs/<?php echo $row['cv_path']; ?>" target="_blank" class="btn btn-sm btn-light border">Download CV</a></td>
                            <td class="small"><?php echo $row['applied_at']; ?></td>
                            <td class="pe-4 text-end">
                                <a href="?tab=applications&action=delete&id=<?php echo $row['id']; ?>" class="btn btn-sm btn-outline-danger">Hired/Reject (Delete)</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                <?php endif; ?>

                <?php if (empty($data)): ?>
                <tr>
                    <td colspan="5" class="empty-state">
                        <img src="https://cdn-icons-png.flaticon.com/512/9101/9101297.png" width="80" class="mb-3 opacity-25">
                        <p class="mb-0">You're all caught up! No active entries found.</p>
                    </td>
                </tr>
                <?php endif; ?>
            </table>
        </div>
    </div>
</main>

<!-- Blog Modal -->
<div class="modal fade" id="blogModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <form method="POST" class="modal-content border-0">
            <div class="modal-header bg-dark text-white border-0">
                <h5 class="modal-title font-display">New Blog Entry</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <div class="row g-3">
                    <div class="col-md-8"><label class="form-label">Title</label><input type="text" name="title" class="form-control" required></div>
                    <div class="col-md-4"><label class="form-label">Category</label><input type="text" name="category" class="form-control" placeholder="Marketing, IT..." required></div>
                    <div class="col-md-4"><label class="form-label">Read Time</label><input type="text" name="read_time" class="form-control" placeholder="5 min"></div>
                    <div class="col-12"><label class="form-label">Summary Description</label><textarea name="description" class="form-control"></textarea></div>
                    <div class="col-12"><label class="form-label">Full Content (HTML allowed)</label><textarea name="content" class="form-control" rows="8"></textarea></div>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="submit" name="add_blog" class="btn btn-accent py-2 w-100">Publish to Oasis</button>
            </div>
        </form>
    </div>
</div>

<!-- Job Modal -->
<div class="modal fade" id="jobModal" tabindex="-1">
    <div class="modal-dialog">
        <form method="POST" class="modal-content border-0">
            <div class="modal-header bg-dark text-white border-0">
                <h5 class="modal-title font-display">Post New Career Offer</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <div class="row g-3">
                    <div class="col-12"><label class="form-label">Position Title</label><input type="text" name="title" class="form-control" required></div>
                    <div class="col-md-6"><label class="form-label">Category</label><input type="text" name="category" class="form-control" required></div>
                    <div class="col-md-6"><label class="form-label">Location</label><input type="text" name="location" class="form-control"></div>
                    <div class="col-12"><label class="form-label">Salary Details</label><input type="text" name="salary" class="form-control"></div>
                    <div class="col-12"><label class="form-label">Short Summary</label><textarea name="description" class="form-control"></textarea></div>
                    <div class="col-12"><label class="form-label">Full Job Details</label><textarea name="full_details" class="form-control" rows="5"></textarea></div>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="submit" name="add_job" class="btn btn-accent py-2 w-100">Post Live</button>
            </div>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
