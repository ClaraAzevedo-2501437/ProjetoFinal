import { createRouter, createWebHistory } from 'vue-router';
import AuthService from '../services/authService';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DocentesView from '../views/DocentesView.vue';
import AlunosView from '../views/AlunosView.vue';
import DashboardView from '../views/DashboardView.vue';
import AdminView from '../views/AdminView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/docentes',
    name: 'Docentes',
    component: DocentesView,
  },
  {
    path: '/alunos',
    name: 'Alunos',
    component: AlunosView,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, role: 'DOCENTE' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.meta.role;
  
  if (requiresAuth) {
    if (!AuthService.isAuthenticated()) {
      // Redirect to login if not authenticated
      next({ name: 'Login', query: { redirect: to.fullPath } });
    } else if (requiredRole && !AuthService.hasRole(requiredRole)) {
      // Redirect to home if user doesn't have required role
      alert('You do not have permission to access this page');
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
