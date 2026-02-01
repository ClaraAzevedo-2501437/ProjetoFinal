const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'project_proposals',
  user: 'postgres',
  password: 'PGSQL2026',
});

async function fixAdminPassword() {
  try {
    // Generate correct hash for "admin123"
    const hash = await bcrypt.hash('admin123', 10);
    console.log('Hash gerado:', hash);

    // Update admin user
    await pool.query(`
      UPDATE docente 
      SET password_hash = $1 
      WHERE email = 'admin@university.edu'
    `, [hash]);

    console.log('✓ Password do admin atualizada com sucesso!');
    console.log('\nCredenciais:');
    console.log('Email: admin@university.edu');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    await pool.end();
  }
}

fixAdminPassword();
