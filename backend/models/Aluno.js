const db = require('./db');

class Aluno {
    static async findAll() {
        const result = await db.query(`
            SELECT a.id_aluno, a.nome, a.email, a.numero, a.id_proposta, 
                   p.titulo as proposta_titulo, a.created_at
            FROM aluno a
            LEFT JOIN proposta p ON a.id_proposta = p.id_proposta
            ORDER BY a.nome
        `);
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(`
            SELECT a.id_aluno, a.nome, a.email, a.numero, a.id_proposta,
                   p.titulo as proposta_titulo, a.created_at
            FROM aluno a
            LEFT JOIN proposta p ON a.id_proposta = p.id_proposta
            WHERE a.id_aluno = $1
        `, [id]);
        return result.rows[0];
    }

    static async create(nome, email, numero, idProposta = null) {
        const result = await db.query(
            'INSERT INTO aluno (nome, email, numero, id_proposta) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, numero, idProposta]
        );
        return result.rows[0];
    }

    static async update(id, nome, email, numero, idProposta = null) {
        const result = await db.query(
            'UPDATE aluno SET nome = $1, email = $2, numero = $3, id_proposta = $4 WHERE id_aluno = $5 RETURNING *',
            [nome, email, numero, idProposta, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query(
            'DELETE FROM aluno WHERE id_aluno = $1 RETURNING id_aluno',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = Aluno;
