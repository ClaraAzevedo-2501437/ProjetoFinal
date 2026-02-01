<template>
  <div class="proposta-card">
    <h3>{{ proposta.titulo }}</h3>
    <p class="description">{{ proposta.descricao_objetivos }}</p>
    
    <div class="metadata">
      <p><strong>Orientador:</strong> {{ proposta.orientador_nome }}</p>
      
      <div v-if="proposta.aluno_nome">
        <p><strong>Aluno Atribuído:</strong> {{ proposta.aluno_nome }} ({{ proposta.aluno_numero }})</p>
      </div>
      <div v-else>
        <p class="sem-aluno"><strong>Aluno:</strong> Não atribuída</p>
      </div>
      
      <div v-if="proposta.coorientadores && proposta.coorientadores.length > 0">
        <p><strong>Coorientadores:</strong></p>
        <ul>
          <li v-for="co in proposta.coorientadores" :key="co.id_docente">
            {{ co.nome }}
          </li>
        </ul>
      </div>
      
      <div v-if="proposta.palavras_chave && proposta.palavras_chave.length > 0" class="keywords">
        <strong>Palavras-chave:</strong>
        <span 
          v-for="kw in proposta.palavras_chave" 
          :key="kw.id_palavra"
          class="keyword-badge"
        >
          {{ kw.palavra }}
        </span>
      </div>
    </div>
    
    <div class="actions" v-if="showActions">
      <button @click="$emit('edit', proposta)" class="btn btn-edit">Editar</button>
      <button @click="$emit('delete', proposta)" class="btn btn-delete">Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropostaCard',
  props: {
    proposta: {
      type: Object,
      required: true,
    },
    showActions: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['edit', 'delete'],
};
</script>

<style scoped>
.proposta-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.proposta-card h3 {
  margin-top: 0;
  color: #2c3e50;
}

.description {
  color: #555;
  margin: 1rem 0;
  line-height: 1.6;
}

.metadata {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.metadata ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.keywords {
  margin-top: 0.5rem;
}

.keyword-badge {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  margin: 0.25rem;
  font-size: 0.85rem;
}

.sem-aluno {
  color: #95a5a6;
  font-style: italic;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.8;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}
</style>
