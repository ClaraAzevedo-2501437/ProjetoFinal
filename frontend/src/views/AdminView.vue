<template>
  <div class="admin-view">
    <h1>Painel de Administração</h1>
    <p class="subtitle">Gerir docentes e alunos</p>
    
    <div class="tabs">
      <button 
        @click="activeTab = 'docentes'"
        :class="{ active: activeTab === 'docentes' }"
        class="tab-button"
      >
        Docentes
      </button>
      <button 
        @click="activeTab = 'alunos'"
        :class="{ active: activeTab === 'alunos' }"
        class="tab-button"
      >
        Alunos
      </button>
    </div>
    
    <!-- Docentes Tab -->
    <div v-if="activeTab === 'docentes'" class="tab-content">
      <div class="section-header">
        <h2>Gestão de Docentes</h2>
        <button @click="showDocenteForm = true" class="btn btn-primary">
          + Adicionar Docente
        </button>
      </div>
      
      <div v-if="loadingDocentes" class="loading">A carregar...</div>
      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="docente in docentes" :key="docente.id_docente">
              <td>{{ docente.id_docente }}</td>
              <td>{{ docente.nome }}</td>
              <td>{{ docente.email }}</td>
              <td>
                <button @click="editDocente(docente)" class="btn-sm btn-edit">Editar</button>
                <button @click="deleteDocente(docente)" class="btn-sm btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Alunos Tab -->
    <div v-if="activeTab === 'alunos'" class="tab-content">
      <div class="section-header">
        <h2>Gestão de Alunos</h2>
        <button @click="showAlunoForm = true" class="btn btn-primary">
          + Adicionar Aluno
        </button>
      </div>
      
      <div v-if="loadingAlunos" class="loading">A carregar...</div>
      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Número</th>
              <th>Proposta</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="aluno in alunos" :key="aluno.id_aluno">
              <td>{{ aluno.id_aluno }}</td>
              <td>{{ aluno.nome }}</td>
              <td>{{ aluno.email }}</td>
              <td>{{ aluno.numero }}</td>
              <td>{{ aluno.proposta_titulo || 'Nenhuma' }}</td>
              <td>
                <button @click="editAluno(aluno)" class="btn-sm btn-edit">Editar</button>
                <button @click="deleteAluno(aluno)" class="btn-sm btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Docente Form Modal (Simplified) -->
    <div v-if="showDocenteForm" class="modal-overlay" @click.self="closeDocenteForm">
      <div class="modal-content">
        <h2>{{ editingDocente ? 'Editar' : 'Adicionar' }} Docente</h2>
        <form @submit.prevent="submitDocente">
          <div class="form-group">
            <label>Nome *</label>
            <input v-model="docenteForm.nome" required class="form-control" />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="docenteForm.email" type="email" required class="form-control" />
          </div>
          <div class="form-group">
            <label>Palavra-passe {{ editingDocente ? '(deixe vazio para manter a atual)' : '*' }}</label>
            <input 
              v-model="docenteForm.password" 
              type="password" 
              :required="!editingDocente"
              class="form-control" 
            />
          </div>
          <div class="form-actions">
            <button type="button" @click="closeDocenteForm" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Aluno Form Modal (Simplified) -->
    <div v-if="showAlunoForm" class="modal-overlay" @click.self="closeAlunoForm">
      <div class="modal-content">
        <h2>{{ editingAluno ? 'Editar' : 'Adicionar' }} Aluno</h2>
        <form @submit.prevent="submitAluno">
          <div class="form-group">
            <label>Nome *</label>
            <input v-model="alunoForm.nome" required class="form-control" />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="alunoForm.email" type="email" required class="form-control" />
          </div>
          <div class="form-group">
            <label>Número de Aluno *</label>
            <input v-model="alunoForm.numero" required class="form-control" />
          </div>
          <div class="form-group">
            <label>ID da Proposta (opcional)</label>
            <input v-model.number="alunoForm.id_proposta" type="number" class="form-control" />
          </div>
          <div class="form-actions">
            <button type="button" @click="closeAlunoForm" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DocenteService from '../services/docenteService';
import AlunoService from '../services/alunoService';

export default {
  name: 'AdminView',
  setup() {
    const activeTab = ref('docentes');
    
    // Docentes
    const docentes = ref([]);
    const loadingDocentes = ref(false);
    const showDocenteForm = ref(false);
    const editingDocente = ref(null);
    const docenteForm = ref({ nome: '', email: '', password: '' });
    
    // Alunos
    const alunos = ref([]);
    const loadingAlunos = ref(false);
    const showAlunoForm = ref(false);
    const editingAluno = ref(null);
    const alunoForm = ref({ nome: '', email: '', numero: '', id_proposta: null });
    
    // Load Docentes
    const loadDocentes = async () => {
      try {
        loadingDocentes.value = true;
        docentes.value = await DocenteService.getAll();
      } catch (err) {
        alert('Falha ao carregar docentes');
        console.error(err);
      } finally {
        loadingDocentes.value = false;
      }
    };
    
    const editDocente = (docente) => {
      editingDocente.value = docente;
      docenteForm.value = {
        nome: docente.nome,
        email: docente.email,
        password: '',
      };
      showDocenteForm.value = true;
    };
    
    const deleteDocente = async (docente) => {
      if (!confirm(`Eliminar docente ${docente.nome}?`)) return;
      try {
        await DocenteService.delete(docente.id_docente);
        await loadDocentes();
      } catch (err) {
        alert('Falha ao eliminar docente');
        console.error(err);
      }
    };
    
    const submitDocente = async () => {
      try {
        if (editingDocente.value) {
          await DocenteService.update(editingDocente.value.id_docente, docenteForm.value);
        } else {
          await DocenteService.create(docenteForm.value);
        }
        closeDocenteForm();
        await loadDocentes();
      } catch (err) {
        alert('Falha ao guardar docente');
        console.error(err);
      }
    };
    
    const closeDocenteForm = () => {
      showDocenteForm.value = false;
      editingDocente.value = null;
      docenteForm.value = { nome: '', email: '', password: '' };
    };
    
    // Load Alunos
    const loadAlunos = async () => {
      try {
        loadingAlunos.value = true;
        alunos.value = await AlunoService.getAll();
      } catch (err) {
        alert('Falha ao carregar alunos');
        console.error(err);
      } finally {
        loadingAlunos.value = false;
      }
    };
    
    const editAluno = (aluno) => {
      editingAluno.value = aluno;
      alunoForm.value = {
        nome: aluno.nome,
        email: aluno.email,
        numero: aluno.numero,
        id_proposta: aluno.id_proposta,
      };
      showAlunoForm.value = true;
    };
    
    const deleteAluno = async (aluno) => {
      if (!confirm(`Eliminar aluno ${aluno.nome}?`)) return;
      try {
        await AlunoService.delete(aluno.id_aluno);
        await loadAlunos();
      } catch (err) {
        alert('Falha ao eliminar aluno');
        console.error(err);
      }
    };
    
    const submitAluno = async () => {
      try {
        if (editingAluno.value) {
          await AlunoService.update(editingAluno.value.id_aluno, alunoForm.value);
        } else {
          await AlunoService.create(alunoForm.value);
        }
        closeAlunoForm();
        await loadAlunos();
      } catch (err) {
        alert('Falha ao guardar aluno');
        console.error(err);
      }
    };
    
    const closeAlunoForm = () => {
      showAlunoForm.value = false;
      editingAluno.value = null;
      alunoForm.value = { nome: '', email: '', numero: '', id_proposta: null };
    };
    
    onMounted(() => {
      loadDocentes();
      loadAlunos();
    });
    
    return {
      activeTab,
      docentes,
      loadingDocentes,
      showDocenteForm,
      editingDocente,
      docenteForm,
      editDocente,
      deleteDocente,
      submitDocente,
      closeDocenteForm,
      alunos,
      loadingAlunos,
      showAlunoForm,
      editingAluno,
      alunoForm,
      editAluno,
      deleteAluno,
      submitAluno,
      closeAlunoForm,
    };
  },
};
</script>

<style scoped>
.admin-view {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ddd;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: #7f8c8d;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab-button.active {
  color: #3498db;
  border-bottom-color: #3498db;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  color: #34495e;
}

.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.btn, .btn-sm {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn:hover, .btn-sm:hover {
  opacity: 0.8;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.loading {
  padding: 2rem;
  text-align: center;
  color: #7f8c8d;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.modal-content h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #3498db;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
</style>
