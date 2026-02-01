const db = require('./db');

class Proposta {
    static async findAll() {
        const result = await db.query(`
            SELECT p.id_proposta, p.titulo, p.descricao_objetivos, 
                   p.id_orientador, d.nome as orientador_nome,
                   p.id_aluno, a.nome as aluno_nome, a.numero as aluno_numero,
                   p.created_at, p.updated_at
            FROM proposta p
            JOIN docente d ON p.id_orientador = d.id_docente
            LEFT JOIN aluno a ON p.id_aluno = a.id_aluno
            ORDER BY p.created_at DESC
        `);
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(`
            SELECT p.id_proposta, p.titulo, p.descricao_objetivos,
                   p.id_orientador, d.nome as orientador_nome,
                   p.id_aluno, a.nome as aluno_nome, a.numero as aluno_numero,
                   p.created_at, p.updated_at
            FROM proposta p
            JOIN docente d ON p.id_orientador = d.id_docente
            LEFT JOIN aluno a ON p.id_aluno = a.id_aluno
            WHERE p.id_proposta = $1
        `, [id]);
        return result.rows[0];
    }

    static async findByOrientador(idOrientador) {
        const result = await db.query(`
            SELECT p.id_proposta, p.titulo, p.descricao_objetivos,
                   p.id_orientador, d.nome as orientador_nome,
                   p.id_aluno, a.nome as aluno_nome, a.numero as aluno_numero,
                   p.created_at, p.updated_at
            FROM proposta p
            JOIN docente d ON p.id_orientador = d.id_docente
            LEFT JOIN aluno a ON p.id_aluno = a.id_aluno
            WHERE p.id_orientador = $1
            ORDER BY p.created_at DESC
        `, [idOrientador]);
        return result.rows;
    }

    static async create(titulo, descricaoObjetivos, idOrientador, idAluno = null) {
        const result = await db.query(
            'INSERT INTO proposta (titulo, descricao_objetivos, id_orientador, id_aluno) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, descricaoObjetivos, idOrientador, idAluno]
        );
        return result.rows[0];
    }

    static async update(id, titulo, descricaoObjetivos, idAluno = null) {
        const result = await db.query(
            'UPDATE proposta SET titulo = $1, descricao_objetivos = $2, id_aluno = $3, updated_at = CURRENT_TIMESTAMP WHERE id_proposta = $4 RETURNING *',
            [titulo, descricaoObjetivos, idAluno, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query(
            'DELETE FROM proposta WHERE id_proposta = $1 RETURNING id_proposta',
            [id]
        );
        return result.rows[0];
    }

    static async addCoorientador(idProposta, idDocente) {
        const result = await db.query(
            'INSERT INTO proposta_coorientador (id_proposta, id_docente) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
            [idProposta, idDocente]
        );
        return result.rows[0];
    }

    static async removeCoorientador(idProposta, idDocente) {
        const result = await db.query(
            'DELETE FROM proposta_coorientador WHERE id_proposta = $1 AND id_docente = $2 RETURNING *',
            [idProposta, idDocente]
        );
        return result.rows[0];
    }

    static async getCoorientadores(idProposta) {
        const result = await db.query(`
            SELECT d.id_docente, d.nome, d.email
            FROM docente d
            JOIN proposta_coorientador pc ON d.id_docente = pc.id_docente
            WHERE pc.id_proposta = $1
        `, [idProposta]);
        return result.rows;
    }

    static async addPalavraChave(idProposta, idPalavra) {
        const result = await db.query(
            'INSERT INTO proposta_palavra_chave (id_proposta, id_palavra) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
            [idProposta, idPalavra]
        );
        return result.rows[0];
    }

    static async removePalavraChave(idProposta, idPalavra) {
        const result = await db.query(
            'DELETE FROM proposta_palavra_chave WHERE id_proposta = $1 AND id_palavra = $2 RETURNING *',
            [idProposta, idPalavra]
        );
        return result.rows[0];
    }

    static async getPalavrasChave(idProposta) {
        const result = await db.query(`
            SELECT pc.id_palavra, pc.palavra
            FROM palavra_chave pc
            JOIN proposta_palavra_chave ppk ON pc.id_palavra = ppk.id_palavra
            WHERE ppk.id_proposta = $1
        `, [idProposta]);
        return result.rows;
    }
}

module.exports = Proposta;
