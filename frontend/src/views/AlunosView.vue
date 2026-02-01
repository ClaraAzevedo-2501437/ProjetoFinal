<template>
  <div class="alunos-view">
    <h1>Alunos</h1>
    <p class="subtitle">Consultar todos os alunos do sistema</p>
    
    <div v-if="loading" class="loading">A carregar...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="alunos.length === 0" class="empty">
      Não há alunos disponíveis.
    </div>
    <div v-else class="alunos-list">
      <div v-for="aluno in alunos" :key="aluno.id_aluno" class="aluno-card">
        <h3>{{ aluno.nome }}</h3>
        <p><strong>Email:</strong> {{ aluno.email }}</p>
        <p><strong>Número:</strong> {{ aluno.numero }}</p>
        <p class="date">Membro desde: {{ formatDate(aluno.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AlunoService from '../services/alunoService';

export default {
  name: 'AlunosView',
  setup() {
    const alunos = ref([]);
    const loading = ref(true);
    const error = ref(null);
    
    const loadAlunos = async () => {
      try {
        loading.value = true;
        error.value = null;
        alunos.value = await AlunoService.getAll();
      } catch (err) {
        error.value = 'Falha ao carregar alunos';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    
    onMounted(() => {
      loadAlunos();
    });
    
    return {
      alunos,
      loading,
      error,
      formatDate,
    };
  },
};
</script>

<style scoped>
.alunos-view {
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

.alunos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
}

.aluno-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.aluno-card h3 {
  margin-top: 0;
  color: #2c3e50;
}

.aluno-card p {
  margin: 0.5rem 0;
  color: #555;
}

.sem-proposta {
  color: #95a5a6;
  font-style: italic;
}

.date {
  font-size: 0.85rem;
  color: #95a5a6;
  font-style: italic;
}
</style>
