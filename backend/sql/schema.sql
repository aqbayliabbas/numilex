CREATE DATABASE IF NOT EXISTS numilex_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE numilex_db;

-- Table: admins
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: devis (collaboration requests)
CREATE TABLE IF NOT EXISTS devis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: blogs (articles)
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    read_time VARCHAR(50),
    description TEXT,
    content LONGTEXT NOT NULL,
    seo_tags VARCHAR(255),
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: jobs (job offers)
CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    full_details LONGTEXT NOT NULL,
    location VARCHAR(255),
    salary VARCHAR(255),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: applications (job applications)
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    cv_path VARCHAR(255) NOT NULL,
    message TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Insert Default Admin (Password: Numilex202606)
-- Note: Replace with real hash for security. Standard PHP password_hash() for "Numilex202606"
-- For now, adding a temporary placeholder if they need one, or just providing instructions.
INSERT INTO admins (username, password) VALUES ('Numilex202606', '$2y$10$7rX5O7.Vq7i6r8M0g0Y6e.7v1vP1vP1vP1vP1vP1vP1vP1vP1vP1vP1'); 
-- Note: The hash above is a dummy. Better to run a setup script.
