import ApiService from './api';

class AlunoService {
    static async getAll() {
        return ApiService.get('/alunos');
    }

    static async getById(id) {
        return ApiService.get(`/alunos/${id}`);
    }

    static async create(aluno) {
        return ApiService.post('/alunos', aluno);
    }

    static async update(id, aluno) {
        return ApiService.put(`/alunos/${id}`, aluno);
    }

    static async delete(id) {
        return ApiService.delete(`/alunos/${id}`);
    }
}

export default AlunoService;
