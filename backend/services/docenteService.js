const Docente = require('../models/Docente');
const AuthService = require('./authService');

class DocenteService {
    static async getAllDocentes() {
        return await Docente.findAll();
    }

    static async getDocenteById(id) {
        const docente = await Docente.findById(id);
        if (!docente) {
            throw new Error('Docente not found');
        }
        return docente;
    }

    static async createDocente(nome, email, password) {
        // Check if email already exists
        const existing = await Docente.findByEmail(email);
        if (existing) {
            throw new Error('Email already in use');
        }

        // Hash password
        const passwordHash = await AuthService.hashPassword(password);

        // Create docente
        return await Docente.create(nome, email, passwordHash);
    }

    static async updateDocente(id, nome, email, password) {
        const docente = await Docente.findById(id);
        if (!docente) {
            throw new Error('Docente not found');
        }

        // Check if email is being changed and if it's already in use
        if (email !== docente.email) {
            const existing = await Docente.findByEmail(email);
            if (existing) {
                throw new Error('Email already in use');
            }
        }

        // Update with or without password
        if (password) {
            const passwordHash = await AuthService.hashPassword(password);
            return await Docente.update(id, nome, email, passwordHash);
        } else {
            return await Docente.updateWithoutPassword(id, nome, email);
        }
    }

    static async deleteDocente(id) {
        const docente = await Docente.findById(id);
        if (!docente) {
            throw new Error('Docente not found');
        }
        return await Docente.delete(id);
    }
}

module.exports = DocenteService;
