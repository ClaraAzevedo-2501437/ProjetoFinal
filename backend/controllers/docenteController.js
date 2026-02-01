const DocenteService = require('../services/docenteService');

class DocenteController {
    static async getAll(req, res) {
        try {
            const docentes = await DocenteService.getAllDocentes();
            res.json(docentes);
        } catch (error) {
            console.error('Get docentes error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const docente = await DocenteService.getDocenteById(parseInt(id));
            res.json(docente);
        } catch (error) {
            if (error.message === 'Docente not found') {
                return res.status(404).json({ error: error.message });
            }
            console.error('Get docente error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async create(req, res) {
        try {
            const { nome, email, password } = req.body;

            if (!nome || !email || !password) {
                return res.status(400).json({ error: 'Nome, email and password are required' });
            }

            const docente = await DocenteService.createDocente(nome, email, password);
            res.status(201).json(docente);
        } catch (error) {
            if (error.message === 'Email already in use') {
                return res.status(409).json({ error: error.message });
            }
            console.error('Create docente error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, password } = req.body;

            if (!nome || !email) {
                return res.status(400).json({ error: 'Nome and email are required' });
            }

            const docente = await DocenteService.updateDocente(parseInt(id), nome, email, password);
            res.json(docente);
        } catch (error) {
            if (error.message === 'Docente not found') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message === 'Email already in use') {
                return res.status(409).json({ error: error.message });
            }
            console.error('Update docente error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await DocenteService.deleteDocente(parseInt(id));
            res.json({ message: 'Docente deleted successfully' });
        } catch (error) {
            if (error.message === 'Docente not found') {
                return res.status(404).json({ error: error.message });
            }
            console.error('Delete docente error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = DocenteController;
