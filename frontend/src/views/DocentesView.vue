<template>
  <div class="docentes-view">
    <h1>Docentes</h1>
    <p class="subtitle">Consultar todos os docentes da universidade</p>
    
    <div v-if="loading" class="loading">A carregar...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="docentes.length === 0" class="empty">
      Não há docentes disponíveis.
    </div>
    <div v-else class="docentes-list">
      <div v-for="docente in docentes" :key="docente.id_docente" class="docente-card">
        <h3>{{ docente.nome }}</h3>
        <p><strong>Email:</strong> {{ docente.email }}</p>
        <p class="date">Membro desde: {{ formatDate(docente.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DocenteService from '../services/docenteService';

export default {
  name: 'DocentesView',
  setup() {
    const docentes = ref([]);
    const loading = ref(true);
    const error = ref(null);
    
    const loadDocentes = async () => {
      try {
        loading.value = true;
        error.value = null;
        docentes.value = await DocenteService.getAll();
      } catch (err) {
        error.value = 'Falha ao carregar docentes';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    
    onMounted(() => {
      loadDocentes();
    });
    
    return {
      docentes,
      loading,
      error,
      formatDate,
    };
  },
};
</script>

<style scoped>
.docentes-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.loading, .error, .empty {
  padding: 2rem;
  text-align: center;
  color: #7f8c8d;
}

.error {
  color: #e74c3c;
}

.docentes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
}

.docente-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.docente-card h3 {
  margin-top: 0;
  color: #2c3e50;
}

.docente-card p {
  margin: 0.5rem 0;
  color: #555;
}

.date {
  font-size: 0.85rem;
  color: #95a5a6;
  font-style: italic;
}
</style>
