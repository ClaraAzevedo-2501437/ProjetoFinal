const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'project_proposals',
  user: 'postgres',
  password: 'PGSQL2026',
});

async function testDatabase() {
  console.log('\n=== TESTE DE INTEGRIDADE DA BASE DE DADOS ===\n');
  
  try {
    // Test 1: Verificar estrutura da tabela docente
    console.log('1. Verificar estrutura docente...');
    const docenteColumns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'docente'
      ORDER BY ordinal_position
    `);
    console.log('✓ Colunas docente:', docenteColumns.rows.map(r => r.column_name).join(', '));

    // Test 2: Verificar estrutura da tabela proposta
    console.log('\n2. Verificar estrutura proposta...');
    const propostaColumns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'proposta'
      ORDER BY ordinal_position
    `);
    console.log('✓ Colunas proposta:', propostaColumns.rows.map(r => r.column_name).join(', '));

    // Test 3: Verificar estrutura da tabela aluno
    console.log('\n3. Verificar estrutura aluno...');
    const alunoColumns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'aluno'
      ORDER BY ordinal_position
    `);
    console.log('✓ Colunas aluno:', alunoColumns.rows.map(r => r.column_name).join(', '));

    // Test 4: Query de propostas com aluno (como no código)
    console.log('\n4. Testar query propostas com aluno...');
    const propostas = await pool.query(`
      SELECT p.id_proposta, p.titulo, p.descricao_objetivos,
             p.id_orientador, d.nome as orientador_nome,
             p.id_aluno, a.nome as aluno_nome, a.numero as aluno_numero,
             p.created_at, p.updated_at
      FROM proposta p
      JOIN docente d ON p.id_orientador = d.id_docente
      LEFT JOIN aluno a ON p.id_aluno = a.id_aluno
      ORDER BY p.created_at DESC
      LIMIT 1
    `);
    console.log('✓ Query propostas funciona. Exemplo:', propostas.rows[0] ? {
      titulo: propostas.rows[0].titulo,
      orientador: propostas.rows[0].orientador_nome,
      aluno: propostas.rows[0].aluno_nome || 'Não atribuída'
    } : 'Sem propostas');

    // Test 5: Query de docentes com role
    console.log('\n5. Testar query docentes...');
    const docentes = await pool.query('SELECT id_docente, nome, email, role FROM docente LIMIT 2');
    console.log('✓ Query docentes funciona. Exemplos:');
    docentes.rows.forEach(d => console.log(`   - ${d.nome} (${d.role})`));

    // Test 6: Query de alunos
    console.log('\n6. Testar query alunos...');
    const alunos = await pool.query(`
      SELECT a.id_aluno, a.nome, a.email, a.numero, a.id_proposta,
             p.titulo as proposta_titulo, a.created_at
      FROM aluno a
      LEFT JOIN proposta p ON a.id_proposta = p.id_proposta
      LIMIT 2
    `);
    console.log('✓ Query alunos funciona. Encontrados:', alunos.rows.length, 'alunos');

    // Test 7: Verificar admin
    console.log('\n7. Verificar utilizador admin...');
    const admin = await pool.query("SELECT nome, email, role FROM docente WHERE role = 'ADMIN' LIMIT 1");
    if (admin.rows.length > 0) {
      console.log('✓ Admin encontrado:', admin.rows[0].email);
    } else {
      console.log('✗ Nenhum admin encontrado');
    }

    console.log('\n=== TODOS OS TESTES PASSARAM ===\n');

  } catch (error) {
    console.error('\n✗ ERRO:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await pool.end();
  }
}

testDatabase();
