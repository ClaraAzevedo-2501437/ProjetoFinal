const db = require('./db');

class PalavraChave {
    static async findAll() {
        const result = await db.query(
            'SELECT id_palavra, palavra FROM palavra_chave ORDER BY palavra'
        );
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(
            'SELECT id_palavra, palavra FROM palavra_chave WHERE id_palavra = $1',
            [id]
        );
        return result.rows[0];
    }

    static async findByPalavra(palavra) {
        const result = await db.query(
            'SELECT id_palavra, palavra FROM palavra_chave WHERE palavra = $1',
            [palavra]
        );
        return result.rows[0];
    }

    static async create(palavra) {
        const result = await db.query(
            'INSERT INTO palavra_chave (palavra) VALUES ($1) RETURNING *',
            [palavra]
        );
        return result.rows[0];
    }

    static async findOrCreate(palavra) {
        let palavraChave = await this.findByPalavra(palavra);
        if (!palavraChave) {
            palavraChave = await this.create(palavra);
        }
        return palavraChave;
    }
}

module.exports = PalavraChave;
