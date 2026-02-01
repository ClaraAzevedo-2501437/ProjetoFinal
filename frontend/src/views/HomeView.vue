<template>
  <div class="home-view">
    <h1>Sistema de Gestão de Propostas de Projeto</h1>
    <p class="subtitle">Plataforma para gerir propostas de projeto de fim de curso</p>
    
    <div class="content">
      <h2>Funcionalidades Disponíveis</h2>
      
      <div class="features">
        <div class="feature-card">
          <h3>Ver Docentes</h3>
          <p>Consultar a lista de todos os docentes do sistema</p>
          <router-link to="/docentes" class="btn btn-primary">Ver Docentes</router-link>
        </div>
        
        <div class="feature-card" v-if="isDocente">
          <h3>Ver Alunos</h3>
          <p>Consultar a lista de todos os alunos do sistema</p>
          <router-link to="/alunos" class="btn btn-primary">Ver Alunos</router-link>
        </div>
        
        <div class="feature-card" v-if="isDocente">
          <h3>Minhas Propostas</h3>
          <p>Ver e gerir as suas propostas de projeto</p>
          <router-link to="/dashboard" class="btn btn-primary">Ir para Dashboard</router-link>
        </div>
        
        <div class="feature-card" v-if="isAdmin">
          <h3>Ver Alunos</h3>
          <p>Consultar a lista de todos os alunos do sistema</p>
          <router-link to="/alunos" class="btn btn-primary">Ver Alunos</router-link>
        </div>
        
        <div class="feature-card" v-if="isAdmin">
          <h3>Administração</h3>
          <p>Gerir docentes e alunos</p>
          <router-link to="/admin" class="btn btn-primary">Painel Admin</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import AuthService from '../services/authService';

export default {
  name: 'HomeView',
  setup() {
    const isAuthenticated = computed(() => AuthService.isAuthenticated());
    const isDocente = computed(() => AuthService.hasRole('DOCENTE'));
    const isAdmin = computed(() => AuthService.hasRole('ADMIN'));
    
    return {
      isAuthenticated,
      isDocente,
      isAdmin,
    };
  },
};
</script>

<style scoped>
.home-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  text-align: center;
}

.content h2 {
  color: #34495e;
  margin-bottom: 2rem;
  text-align: center;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
  gap: 2rem;
  margin-top: 2rem;
  justify-content: center;
}

.feature-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 250px;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  min-height: 2.6rem;
}

.feature-card p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  flex-grow: 1;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  text-decoration: none;
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
