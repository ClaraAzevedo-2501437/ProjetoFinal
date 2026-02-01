<template>
  <div class="login-view">
    <div class="login-container">
      <h1>Login</h1>
      <p class="subtitle">Autentique-se para gerir as suas propostas</p>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            v-model="form.email" 
            type="email" 
            required 
            class="form-control"
            placeholder="docente@universidade.pt"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Palavra-passe</label>
          <input 
            id="password"
            v-model="form.password" 
            type="password" 
            required 
            class="form-control"
            placeholder="Introduza a sua palavra-passe"
          />
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? 'A autenticar...' : 'Entrar' }}
        </button>
      </form>
      
      <div class="help-text">
        <p><strong>Conta de Teste (Docente):</strong></p>
        <p>Email: joao.silva@university.edu</p>
        <p>Palavra-passe: password123</p>
        <br>
        <p><strong>Conta de Teste (Admin):</strong></p>
        <p>Email: admin@university.edu</p>
        <p>Palavra-passe: admin123</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/authService';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const form = ref({
      email: '',
      password: '',
    });
    const loading = ref(false);
    const error = ref(null);
    
    const handleLogin = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        await AuthService.login(form.value.email, form.value.password);
        
        // Redirect to home after successful login
        router.push('/');
      } catch (err) {
        error.value = err.message || 'Falha no login. Por favor verifique as suas credenciais.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
    
    return {
      form,
      loading,
      error,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.login-container {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #3498db;
}

.error-message {
  background-color: #fee;
  color: #e74c3c;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.help-text {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #555;
}

.help-text p {
  margin: 0.25rem 0;
}
</style>
