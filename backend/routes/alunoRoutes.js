const express = require('express');
const AlunoController = require('../controllers/alunoController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole, ROLES } = require('../middleware/authorization');

const router = express.Router();

// GET /api/alunos - Get all alunos (DOCENTE and ADMIN)
router.get('/', 
    authenticateToken, 
    AlunoController.getAll
);

// GET /api/alunos/:id - Get aluno by id (DOCENTE and ADMIN)
router.get('/:id', 
    authenticateToken, 
    AlunoController.getById
);

// POST /api/alunos - Create aluno (ADMIN only)
router.post('/', 
    authenticateToken, 
    requireRole(ROLES.ADMIN), 
    AlunoController.create
);

// PUT /api/alunos/:id - Update aluno (ADMIN only)
router.put('/:id', 
    authenticateToken, 
    requireRole(ROLES.ADMIN), 
    AlunoController.update
);

// DELETE /api/alunos/:id - Delete aluno (ADMIN only)
router.delete('/:id', 
    authenticateToken, 
    requireRole(ROLES.ADMIN), 
    AlunoController.delete
);

module.exports = router;
