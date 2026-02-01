import ApiService from './api';

class PropostaService {
    static async getAll() {
        return ApiService.get('/propostas');
    }

    static async getMy() {
        return ApiService.get('/propostas/my');
    }

    static async getById(id) {
        return ApiService.get(`/propostas/${id}`);
    }

    static async create(proposta) {
        return ApiService.post('/propostas', proposta);
    }

    static async update(id, proposta) {
        return ApiService.put(`/propostas/${id}`, proposta);
    }

    static async delete(id) {
        return ApiService.delete(`/propostas/${id}`);
    }
}

export default PropostaService;
