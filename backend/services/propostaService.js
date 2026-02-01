const Proposta = require('../models/Proposta');
const PalavraChave = require('../models/PalavraChave');
const Docente = require('../models/Docente');
const Aluno = require('../models/Aluno');

class PropostaService {
    static async getAllPropostas() {
        const propostas = await Proposta.findAll();
        
        // Enrich with coorientadores and keywords
        for (let proposta of propostas) {
            proposta.coorientadores = await Proposta.getCoorientadores(proposta.id_proposta);
            proposta.palavras_chave = await Proposta.getPalavrasChave(proposta.id_proposta);
        }
        
        return propostas;
    }

    static async getPropostaById(id) {
        const proposta = await Proposta.findById(id);
        if (!proposta) {
            throw new Error('Proposta not found');
        }

        // Enrich with coorientadores and keywords
        proposta.coorientadores = await Proposta.getCoorientadores(id);
        proposta.palavras_chave = await Proposta.getPalavrasChave(id);

        return proposta;
    }

    static async getPropostasByOrientador(idOrientador) {
        const propostas = await Proposta.findByOrientador(idOrientador);
        
        // Enrich with coorientadores and keywords
        for (let proposta of propostas) {
            proposta.coorientadores = await Proposta.getCoorientadores(proposta.id_proposta);
            proposta.palavras_chave = await Proposta.getPalavrasChave(proposta.id_proposta);
        }
        
        return propostas;
    }

    static async createProposta(titulo, descricaoObjetivos, idOrientador, idAluno = null, coorientadores = [], palavrasChave = []) {
        // Validate orientador exists
        const orientador = await Docente.findById(idOrientador);
        if (!orientador) {
            throw new Error('Orientador not found');
        }

        // Validate aluno exists if provided
        if (idAluno) {
            const aluno = await Aluno.findById(idAluno);
            if (!aluno) {
                throw new Error('Aluno not found');
            }
        }

        // Validate all coorientadores exist
        for (let idDocente of coorientadores) {
            const coorientador = await Docente.findById(idDocente);
            if (!coorientador) {
                throw new Error(`Coorientador with id ${idDocente} not found`);
            }
        }

        // Create proposta
        const proposta = await Proposta.create(titulo, descricaoObjetivos, idOrientador, idAluno);

        // Add coorientadores
        for (let idDocente of coorientadores) {
            await Proposta.addCoorientador(proposta.id_proposta, idDocente);
        }

        // Add keywords (find or create them first)
        for (let palavra of palavrasChave) {
            const palavraChave = await PalavraChave.findOrCreate(palavra);
            await Proposta.addPalavraChave(proposta.id_proposta, palavraChave.id_palavra);
        }

        return await this.getPropostaById(proposta.id_proposta);
    }

    static async updateProposta(id, titulo, descricaoObjetivos, idAluno, userId, coorientadores = [], palavrasChave = []) {
        const proposta = await Proposta.findById(id);
        if (!proposta) {
            throw new Error('Proposta not found');
        }

        // Check ownership
        if (proposta.id_orientador !== userId) {
            throw new Error('You can only edit your own proposals');
        }

        // Validate aluno exists if provided
        if (idAluno) {
            const aluno = await Aluno.findById(idAluno);
            if (!aluno) {
                throw new Error('Aluno not found');
            }
        }

        // Validate all coorientadores exist
        for (let idDocente of coorientadores) {
            const coorientador = await Docente.findById(idDocente);
            if (!coorientador) {
                throw new Error(`Coorientador with id ${idDocente} not found`);
            }
        }

        // Update basic info
        await Proposta.update(id, titulo, descricaoObjetivos, idAluno);

        // Update coorientadores: remove all and add new ones
        const currentCoorientadores = await Proposta.getCoorientadores(id);
        for (let co of currentCoorientadores) {
            await Proposta.removeCoorientador(id, co.id_docente);
        }
        for (let idDocente of coorientadores) {
            await Proposta.addCoorientador(id, idDocente);
        }

        // Update keywords: remove all and add new ones
        const currentKeywords = await Proposta.getPalavrasChave(id);
        for (let kw of currentKeywords) {
            await Proposta.removePalavraChave(id, kw.id_palavra);
        }
        for (let palavra of palavrasChave) {
            const palavraChave = await PalavraChave.findOrCreate(palavra);
            await Proposta.addPalavraChave(id, palavraChave.id_palavra);
        }

        return await this.getPropostaById(id);
    }

    static async deleteProposta(id, userId) {
        const proposta = await Proposta.findById(id);
        if (!proposta) {
            throw new Error('Proposta not found');
        }

        // Check ownership
        if (proposta.id_orientador !== userId) {
            throw new Error('You can only delete your own proposals');
        }

        return await Proposta.delete(id);
    }
}

module.exports = PropostaService;
