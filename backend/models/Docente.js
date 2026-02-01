const db = require('./db');

class Docente {
    static async findAll() {
        const result = await db.query(
            'SELECT id_docente, nome, email, role, created_at FROM docente ORDER BY nome'
        );
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(
            'SELECT id_docente, nome, email, role, created_at FROM docente WHERE id_docente = $1',
            [id]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await db.query(
            'SELECT * FROM docente WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }

    static async create(nome, email, passwordHash) {
        const result = await db.query(
            'INSERT INTO docente (nome, email, password_hash) VALUES ($1, $2, $3) RETURNING id_docente, nome, email, created_at',
            [nome, email, passwordHash]
        );
        return result.rows[0];
    }

    static async update(id, nome, email, passwordHash) {
        const result = await db.query(
            'UPDATE docente SET nome = $1, email = $2, password_hash = $3 WHERE id_docente = $4 RETURNING id_docente, nome, email, created_at',
            [nome, email, passwordHash, id]
        );
        return result.rows[0];
    }

    static async updateWithoutPassword(id, nome, email) {
        const result = await db.query(
            'UPDATE docente SET nome = $1, email = $2 WHERE id_docente = $3 RETURNING id_docente, nome, email, created_at',
            [nome, email, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query(
            'DELETE FROM docente WHERE id_docente = $1 RETURNING id_docente',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = Docente;
