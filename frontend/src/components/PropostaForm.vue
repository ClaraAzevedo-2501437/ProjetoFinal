<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isEdit ? 'Editar Proposta' : 'Nova Proposta' }}</h2>
        <button @click="$emit('close')" class="btn-close">&times;</button>
      </div>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="titulo">Título *</label>
          <input 
            id="titulo"
            v-model="form.titulo" 
            type="text" 
            required 
            class="form-control"
          />
        </div>
        
        <div class="form-group">
          <label for="descricao">Descrição e Objetivos *</label>
          <textarea 
            id="descricao"
            v-model="form.descricao_objetivos" 
            required 
            rows="6"
            class="form-control"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="coorientadores">Coorientadores</label>
          <div v-if="loadingDocentes" class="loading-text">A carregar docentes...</div>
          <div v-else>
            <div class="dropdown-group">
              <select 
                v-model="selectedDocenteId" 
                class="form-control"
                :disabled="availableDocentes.length === 0"
              >
                <option value="">Selecionar docente...</option>
                <option 
                  v-for="docente in availableDocentes" 
                  :key="docente.id_docente"
                  :value="docente.id_docente"
                >
                  {{ docente.nome }}
                </option>
              </select>
              <button 
                type="button" 
                @click="addCoorientador"
                :disabled="!selectedDocenteId"
                class="btn btn-add"
              >
                + Adicionar
              </button>
            </div>
            
            <div v-if="selectedCoorientadoresList.length > 0" class="selected-list">
              <div 
                v-for="coorientador in selectedCoorientadoresList" 
                :key="coorientador.id_docente"
                class="selected-item"
              >
                <span>{{ coorientador.nome }}</span>
                <button 
                  type="button" 
                  @click="removeCoorientador(coorientador.id_docente)"
                  class="btn-remove"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="keywords">Palavras-chave (separadas por vírgula)</label>
          <input 
            id="keywords"
            v-model="keywordsInput" 
            type="text" 
            placeholder="ex: IA, Machine Learning"
            class="form-control"
          />
        </div>
        
        <div class="form-group">
          <label for="aluno">Atribuir Aluno</label>
          <div v-if="loadingAlunos" class="loading-text">A carregar alunos...</div>
          <select 
            v-else
            id="aluno"
            v-model="form.id_aluno" 
            class="form-control"
          >
            <option :value="null">Nenhum aluno atribuído</option>
            <option 
              v-for="aluno in alunos" 
              :key="aluno.id_aluno"
              :value="aluno.id_aluno"
            >
              {{ aluno.nome }} ({{ aluno.numero }})
            </option>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEdit ? 'Atualizar' : 'Criar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import DocenteService from '../services/docenteService';
import AlunoService from '../services/alunoService';
import AuthService from '../services/authService';

export default {
  name: 'PropostaForm',
  props: {
    proposta: {
      type: Object,
      default: null,
    },
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const isEdit = computed(() => !!props.proposta);
    
    const form = ref({
      titulo: '',
      descricao_objetivos: '',
      id_aluno: null,
    });
    
    const docentes = ref([]);
    const alunos = ref([]);
    const loadingDocentes = ref(false);
    const loadingAlunos = ref(false);
    const selectedCoorientadores = ref([]);
    const selectedDocenteId = ref('');
    const keywordsInput = ref('');
    
    // Filter out current user from coorientadores list
    const availableDocentes = computed(() => {
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) return docentes.value;
      
      return docentes.value.filter(d => 
        d.id_docente !== currentUser.id &&
        !selectedCoorientadores.value.includes(d.id_docente)
      );
    });
    
    // Get list of selected coorientadores with names
    const selectedCoorientadoresList = computed(() => {
      return selectedCoorientadores.value
        .map(id => docentes.value.find(d => d.id_docente === id))
        .filter(d => d);
    });
    
    // Add coorientador to selection
    const addCoorientador = () => {
      if (selectedDocenteId.value && !selectedCoorientadores.value.includes(selectedDocenteId.value)) {
        selectedCoorientadores.value.push(selectedDocenteId.value);
        selectedDocenteId.value = '';
      }
    };
    
    // Remove coorientador from selection
    const removeCoorientador = (id) => {
      const index = selectedCoorientadores.value.indexOf(id);
      if (index > -1) {
        selectedCoorientadores.value.splice(index, 1);
      }
    };
    
    // Load docentes list
    const loadDocentes = async () => {
      try {
        loadingDocentes.value = true;
        docentes.value = await DocenteService.getAll();
      } catch (err) {
        console.error('Erro ao carregar docentes:', err);
      } finally {
        loadingDocentes.value = false;
      }
    };
    
    // Load alunos list
    const loadAlunos = async () => {
      try {
        loadingAlunos.value = true;
        alunos.value = await AlunoService.getAll();
      } catch (err) {
        console.error('Erro ao carregar alunos:', err);
      } finally {
        loadingAlunos.value = false;
      }
    };
    
    // Initialize form with proposta data if editing
    watch(() => props.proposta, (proposta) => {
      if (proposta) {
        form.value.titulo = proposta.titulo;
        form.value.descricao_objetivos = proposta.descricao_objetivos;
        form.value.id_aluno = proposta.id_aluno || null;
        
        if (proposta.coorientadores) {
          selectedCoorientadores.value = proposta.coorientadores
            .map(co => co.id_docente);
        }
        
        if (proposta.palavras_chave) {
          keywordsInput.value = proposta.palavras_chave
            .map(kw => kw.palavra)
            .join(',');
        }
      }
    }, { immediate: true });
    
    const handleSubmit = () => {
      const data = {
        ...form.value,
        coorientadores: selectedCoorientadores.value,
        palavras_chave: keywordsInput.value
          ? keywordsInput.value.split(',').map(kw => kw.trim()).filter(kw => kw)
          : [],
      };
      
      emit('submit', data);
    };
    
    onMounted(() => {
      loadDocentes();
      loadAlunos();
    });
    
    return {
      isEdit,
      form,
      docentes,
      alunos,
      loadingDocentes,
      loadingAlunos,
      availableDocentes,
      selectedCoorientadores,
      selectedCoorientadoresList,
      selectedDocenteId,
      addCoorientador,
      removeCoorientador,
      keywordsInput,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
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
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
}

.btn-close:hover {
  color: #333;
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

textarea.form-control {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.8;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.dropdown-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dropdown-group select {
  flex: 1;
}

.btn-add {
  padding: 0.5rem 1rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: opacity 0.3s;
}

.btn-add:hover:not(:disabled) {
  opacity: 0.8;
}

.btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.selected-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.selected-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: #ecf0f1;
  border-radius: 4px;
}

.selected-item span {
  color: #2c3e50;
}

.btn-remove {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
}

.btn-remove:hover {
  color: #c0392b;
}

.loading-text,
.empty-text {
  padding: 1rem;
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
}
</style>
