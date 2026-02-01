const AuthService = require('../services/authService');

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            const result = await AuthService.login(email, password);
            res.json(result);
        } catch (error) {
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ error: error.message });
            }
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = AuthController;
