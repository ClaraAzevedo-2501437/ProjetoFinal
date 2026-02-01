<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <h1>Propostas de Projeto</h1>
    </div>
    <div class="navbar-menu">
      <router-link to="/" class="nav-item">Início</router-link>
      <router-link to="/docentes" class="nav-item">Docentes</router-link>
      
      <template v-if="isAuthenticated">
        <router-link v-if="isDocente || isAdmin" to="/alunos" class="nav-item">Alunos</router-link>
        <router-link v-if="isDocente" to="/dashboard" class="nav-item">Minhas Propostas</router-link>
        <router-link v-if="isAdmin" to="/admin" class="nav-item">Admin</router-link>
        <span class="nav-item">{{ currentUser?.nome }}</span>
        <button @click="handleLogout" class="btn-logout">Sair</button>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-item">Entrar</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AuthService from '../services/authService';

export default {
  name: 'NavigationBar',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const refreshKey = ref(0);
    
    // Watch for route changes to update navbar
    watch(() => route.path, () => {
      refreshKey.value++;
    });
    
    const currentUser = computed(() => {
      refreshKey.value; // Force reactivity
      return AuthService.getCurrentUser();
    });
    
    const isAuthenticated = computed(() => {
      refreshKey.value; // Force reactivity
      return AuthService.isAuthenticated();
    });
    
    const isDocente = computed(() => {
      refreshKey.value; // Force reactivity
      return AuthService.hasRole('DOCENTE');
    });
    
    const isAdmin = computed(() => {
      refreshKey.value; // Force reactivity
      return AuthService.hasRole('ADMIN');
    });
    
    const handleLogout = () => {
      AuthService.logout();
      refreshKey.value++; // Trigger re-render
      router.push('/login');
    };
    
    return {
      currentUser,
      isAuthenticated,
      isDocente,
      isAdmin,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}

.navbar-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.btn-logout {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #c0392b;
}
</style>
