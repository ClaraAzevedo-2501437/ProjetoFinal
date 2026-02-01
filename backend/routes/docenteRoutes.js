const express = require('express');
const DocenteController = require('../controllers/docenteController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole, ROLES } = require('../middleware/authorization');

const router = express.Router();

// GET /api/docentes - Get all docentes (PUBLIC)
router.get('/', DocenteController.getAll);

// GET /api/docentes/:id - Get docente by id (PUBLIC)
router.get('/:id', DocenteController.getById);

// POST /api/docentes - Create docente (ADMIN only)
router.post('/', 
    authenticateToken, 
    requireRole(ROLES.ADMIN), 
    DocenteController.create
);

// PUT /api/docentes/:id - Update docente (ADMIN only)
router.put('/:id', 
    authenticateToken, 
    requireRole(ROLES.ADMIN), 
    DocenteController.update
);

// DELETE /api/docentes/:id - Delete docente (ADMIN only)
router.delete('/:id', 
    authenticateToken, 
    requireRole(ROLES.ADMIN), 
    DocenteController.delete
);

module.exports = router;
