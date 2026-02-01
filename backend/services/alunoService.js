const Aluno = require('../models/Aluno');
const Proposta = require('../models/Proposta');

class AlunoService {
    static async getAllAlunos() {
        return await Aluno.findAll();
    }

    static async getAlunoById(id) {
        const aluno = await Aluno.findById(id);
        if (!aluno) {
            throw new Error('Aluno not found');
        }
        return aluno;
    }

    static async createAluno(nome, email, numero, idProposta = null) {
        // Validate proposta exists if provided
        if (idProposta) {
            const proposta = await Proposta.findById(idProposta);
            if (!proposta) {
                throw new Error('Proposta not found');
            }
        }
        return await Aluno.create(nome, email, numero, idProposta);
    }

    static async updateAluno(id, nome, email, numero, idProposta = null) {
        const aluno = await Aluno.findById(id);
        if (!aluno) {
            throw new Error('Aluno not found');
        }
        
        // Validate proposta exists if provided
        if (idProposta) {
            const proposta = await Proposta.findById(idProposta);
            if (!proposta) {
                throw new Error('Proposta not found');
            }
        }
        
        return await Aluno.update(id, nome, email, numero, idProposta);
    }

    static async deleteAluno(id) {
        const aluno = await Aluno.findById(id);
        if (!aluno) {
            throw new Error('Aluno not found');
        }
        return await Aluno.delete(id);
    }
}

module.exports = AlunoService;
