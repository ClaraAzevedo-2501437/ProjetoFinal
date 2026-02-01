const PropostaService = require('../services/propostaService');

class PropostaController {
    static async getAll(req, res) {
        try {
            const propostas = await PropostaService.getAllPropostas();
            res.json(propostas);
        } catch (error) {
            console.error('Get propostas error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const proposta = await PropostaService.getPropostaById(parseInt(id));
            res.json(proposta);
        } catch (error) {
            if (error.message === 'Proposta not found') {
                return res.status(404).json({ error: error.message });
            }
            console.error('Get proposta error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getByOrientador(req, res) {
        try {
            // Get from authenticated user
            const idOrientador = req.user.id;
            const propostas = await PropostaService.getPropostasByOrientador(idOrientador);
            res.json(propostas);
        } catch (error) {
            console.error('Get propostas by orientador error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async create(req, res) {
        try {
            const { titulo, descricao_objetivos, id_aluno, coorientadores, palavras_chave } = req.body;

            if (!titulo || !descricao_objetivos) {
                return res.status(400).json({ error: 'Titulo and descricao_objetivos are required' });
            }

            // Get orientador from authenticated user
            const idOrientador = req.user.id;

            const proposta = await PropostaService.createProposta(
                titulo,
                descricao_objetivos,
                idOrientador,
                id_aluno || null,
                coorientadores || [],
                palavras_chave || []
            );
            
            res.status(201).json(proposta);
        } catch (error) {
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            console.error('Create proposta error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, descricao_objetivos, id_aluno, coorientadores, palavras_chave } = req.body;

            if (!titulo || !descricao_objetivos) {
                return res.status(400).json({ error: 'Titulo and descricao_objetivos are required' });
            }

            const userId = req.user.id;

            const proposta = await PropostaService.updateProposta(
                parseInt(id),
                titulo,
                descricao_objetivos,
                id_aluno || null,
                userId,
                coorientadores || [],
                palavras_chave || []
            );
            
            res.json(proposta);
        } catch (error) {
            if (error.message === 'Proposta not found') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message === 'You can only edit your own proposals') {
                return res.status(403).json({ error: error.message });
            }
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            console.error('Update proposta error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            await PropostaService.deleteProposta(parseInt(id), userId);
            res.json({ message: 'Proposta deleted successfully' });
        } catch (error) {
            if (error.message === 'Proposta not found') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message === 'You can only delete your own proposals') {
                return res.status(403).json({ error: error.message });
            }
            console.error('Delete proposta error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = PropostaController;
