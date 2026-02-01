const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Docente = require('../models/Docente');
const { JWT_SECRET } = require('../middleware/auth');

const SALT_ROUNDS = 10;

class AuthService {
    static async login(email, password) {
        // Find docente by email
        const docente = await Docente.findByEmail(email);
        
        if (!docente) {
            throw new Error('Invalid credentials');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, docente.password_hash);
        
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: docente.id_docente,
                email: docente.email,
                role: docente.role || 'DOCENTE',
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            token,
            user: {
                id: docente.id_docente,
                nome: docente.nome,
                email: docente.email,
                role: docente.role || 'DOCENTE',
            },
        };
    }

    static async hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }
}

module.exports = AuthService;
