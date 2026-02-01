import ApiService from './api';

class DocenteService {
    static async getAll() {
        return ApiService.get('/docentes');
    }

    static async getById(id) {
        return ApiService.get(`/docentes/${id}`);
    }

    static async create(docente) {
        return ApiService.post('/docentes', docente);
    }

    static async update(id, docente) {
        return ApiService.put(`/docentes/${id}`, docente);
    }

    static async delete(id) {
        return ApiService.delete(`/docentes/${id}`);
    }
}

export default DocenteService;
