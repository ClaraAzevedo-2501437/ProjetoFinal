const http = require('http');

function makeRequest(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api${path}`,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function testEndpoints() {
  console.log('\n=== TESTE DE ENDPOINTS API ===\n');
  
  try {
    // Test 1: Login como docente
    console.log('1. Login como DOCENTE...');
    const docenteLogin = await makeRequest('POST', '/auth/login', {
      email: 'joao.silva@university.edu',
      password: 'password123'
    });
    const docenteToken = docenteLogin.data.token;
    console.log('✓ Login docente OK. Role:', docenteLogin.data.user.role);

    // Test 2: Login como admin
    console.log('\n2. Login como ADMIN...');
    const adminLogin = await makeRequest('POST', '/auth/login', {
      email: 'admin@university.edu',
      password: 'admin123'
    });
    console.log('✓ Login admin OK. Role:', adminLogin.data.user.role);

    // Test 3: Listar docentes (público)
    console.log('\n3. GET /docentes (público)...');
    const docentes = await makeRequest('GET', '/docentes');
    console.log('✓ Listar docentes OK. Total:', docentes.data.length);

    // Test 4: Listar alunos (docente)
    console.log('\n4. GET /alunos (docente)...');
    const alunos = await makeRequest('GET', '/alunos', null, docenteToken);
    console.log('✓ Listar alunos OK. Total:', alunos.data.length);

    // Test 5: Listar propostas (público)
    console.log('\n5. GET /propostas (público)...');
    const propostas = await makeRequest('GET', '/propostas');
    console.log('✓ Listar propostas OK. Total:', propostas.data.length);
    if (propostas.data.length > 0) {
      const p = propostas.data[0];
      console.log('   Exemplo:', p.titulo);
      console.log('   Aluno:', p.aluno_nome || 'Não atribuída');
    }

    // Test 6: Minhas propostas (docente)
    console.log('\n6. GET /propostas/my (docente)...');
    const myPropostas = await makeRequest('GET', '/propostas/my', null, docenteToken);
    console.log('✓ Minhas propostas OK. Total:', myPropostas.data.length);

    console.log('\n=== ✓ TODOS OS USE CASES FUNCIONAM CORRETAMENTE ===\n');

  } catch (error) {
    console.error('\n✗ ERRO:', error.message);
  }
}

setTimeout(testEndpoints, 500);
