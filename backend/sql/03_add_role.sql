-- Add role column to docente table
ALTER TABLE docente ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'DOCENTE' CHECK (role IN ('DOCENTE', 'ADMIN'));

-- Create an admin user (password: "admin123")
INSERT INTO docente (nome, email, password_hash, role) VALUES
('Admin Sistema', 'admin@university.edu', '$2b$10$YGZ5qN0YhLqKVZhLqO.N3.8wF4xqXH2bKQZJxQXvqF3xX5wF4xqXH', 'ADMIN')
ON CONFLICT (email) DO UPDATE SET role = 'ADMIN';
