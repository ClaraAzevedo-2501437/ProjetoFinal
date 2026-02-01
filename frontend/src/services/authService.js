import ApiService from './api';

class AuthService {
    static async login(email, password) {
        const response = await ApiService.post('/auth/login', { email, password });
        
        // Store token and user info
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        return response;
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    static isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    static hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }
}

export default AuthService;
