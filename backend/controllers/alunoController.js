const AlunoService = require('../services/alunoService');

class AlunoController {
    static async getAll(req, res) {
        try {
            const alunos = await AlunoService.getAllAlunos();
            res.json(alunos);
        } catch (error) {
            console.error('Get alunos error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const aluno = await AlunoService.getAlunoById(parseInt(id));
            res.json(aluno);
        } catch (error) {
            if (error.message === 'Aluno not found') {
                return res.status(404).json({ error: error.message });
            }
            console.error('Get aluno error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async create(req, res) {
        try {
            const { nome, email, numero, id_proposta } = req.body;

            if (!nome || !email || !numero) {
                return res.status(400).json({ error: 'Nome, email and numero are required' });
            }

            const aluno = await AlunoService.createAluno(nome, email, numero, id_proposta);
            res.status(201).json(aluno);
        } catch (error) {
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            console.error('Create aluno error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, numero, id_proposta } = req.body;

            if (!nome || !email || !numero) {
                return res.status(400).json({ error: 'Nome, email and numero are required' });
            }

            const aluno = await AlunoService.updateAluno(parseInt(id), nome, email, numero, id_proposta);
            res.json(aluno);
        } catch (error) {
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            console.error('Update aluno error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await AlunoService.deleteAluno(parseInt(id));
            res.json({ message: 'Aluno deleted successfully' });
        } catch (error) {
            if (error.message === 'Aluno not found') {
                return res.status(404).json({ error: error.message });
            }
            console.error('Delete aluno error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = AlunoController;
