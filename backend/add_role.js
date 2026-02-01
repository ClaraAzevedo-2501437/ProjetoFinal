const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'project_proposals',
  user: 'postgres',
  password: 'PGSQL2026',
});

async function addRoleColumn() {
  try {
    // Add role column
    await pool.query(`
      ALTER TABLE docente 
      ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'DOCENTE'
    `);
    console.log('✓ Coluna role adicionada');

    // Add constraint
    await pool.query(`
      ALTER TABLE docente 
      DROP CONSTRAINT IF EXISTS docente_role_check
    `);
    await pool.query(`
      ALTER TABLE docente 
      ADD CONSTRAINT docente_role_check CHECK (role IN ('DOCENTE', 'ADMIN'))
    `);
    console.log('✓ Constraint adicionada');

    // Create admin user with bcrypt hash for "admin123"
    await pool.query(`
      INSERT INTO docente (nome, email, password_hash, role) VALUES
      ('Admin Sistema', 'admin@university.edu', '$2b$10$YGZ5qN0YhLqKVZhLqO.N3.8wF4xqXH2bKQZJxQXvqF3xX5wF4xqXH', 'ADMIN')
      ON CONFLICT (email) DO UPDATE SET role = 'ADMIN'
    `);
    console.log('✓ Utilizador admin criado: admin@university.edu / admin123');

  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    await pool.end();
  }
}

addRoleColumn();
