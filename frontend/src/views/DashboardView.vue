<template>
  <div class="dashboard-view">
    <div class="header">
      <h1>Minhas Propostas</h1>
      <button @click="showFormModal = true" class="btn btn-primary">
        + Nova Proposta
      </button>
    </div>
    
    <div v-if="loading" class="loading">A carregar...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="propostas.length === 0" class="empty">
      <p>Ainda não criou nenhuma proposta.</p>
      <button @click="showFormModal = true" class="btn btn-primary">
        Criar a Sua Primeira Proposta
      </button>
    </div>
    <div v-else class="propostas-list">
      <PropostaCard 
        v-for="proposta in propostas" 
        :key="proposta.id_proposta"
        :proposta="proposta"
        :show-actions="true"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
    
    <!-- Form Modal -->
    <PropostaForm 
      v-if="showFormModal"
      :proposta="editingProposta"
      @close="closeFormModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import PropostaCard from '../components/PropostaCard.vue';
import PropostaForm from '../components/PropostaForm.vue';
import PropostaService from '../services/propostaService';

export default {
  name: 'DashboardView',
  components: {
    PropostaCard,
    PropostaForm,
  },
  setup() {
    const propostas = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const showFormModal = ref(false);
    const editingProposta = ref(null);
    
    const loadPropostas = async () => {
      try {
        loading.value = true;
        error.value = null;
        propostas.value = await PropostaService.getMy();
      } catch (err) {
        error.value = 'Falha ao carregar propostas';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
    
    const handleEdit = (proposta) => {
      editingProposta.value = proposta;
      showFormModal.value = true;
    };
    
    const handleDelete = async (proposta) => {
      if (!confirm(`Tem a certeza que deseja eliminar "${proposta.titulo}"?`)) {
        return;
      }
      
      try {
        await PropostaService.delete(proposta.id_proposta);
        await loadPropostas();
      } catch (err) {
        alert('Falha ao eliminar proposta');
        console.error(err);
      }
    };
    
    const handleSubmit = async (data) => {
      try {
        if (editingProposta.value) {
          await PropostaService.update(editingProposta.value.id_proposta, data);
        } else {
          await PropostaService.create(data);
        }
        
        closeFormModal();
        await loadPropostas();
      } catch (err) {
        alert('Falha ao guardar proposta');
        console.error(err);
      }
    };
    
    const closeFormModal = () => {
      showFormModal.value = false;
      editingProposta.value = null;
    };
    
    onMounted(() => {
      loadPropostas();
    });
    
    return {
      propostas,
      loading,
      error,
      showFormModal,
      editingProposta,
      handleEdit,
      handleDelete,
      handleSubmit,
      closeFormModal,
    };
  },
};
</script>

<style scoped>
.dashboard-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  margin: 0;
}

.loading, .error, .empty {
  padding: 2rem;
  text-align: center;
  color: #7f8c8d;
}

.error {
  color: #e74c3c;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.propostas-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
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
</style>
