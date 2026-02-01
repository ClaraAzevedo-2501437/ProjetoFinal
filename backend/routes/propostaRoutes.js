const express = require('express');
const PropostaController = require('../controllers/propostaController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole, ROLES } = require('../middleware/authorization');

const router = express.Router();

// GET /api/propostas/my - Get propostas by authenticated docente (DOCENTE only)
// This must come BEFORE /:id route to avoid matching "my" as an id
router.get('/my', 
    authenticateToken, 
    requireRole(ROLES.DOCENTE), 
    PropostaController.getByOrientador
);

// GET /api/propostas - Get all propostas (public)
router.get('/', PropostaController.getAll);

// GET /api/propostas/:id - Get proposta by id (public)
router.get('/:id', PropostaController.getById);

// POST /api/propostas - Create proposta (DOCENTE only)
router.post('/', 
    authenticateToken, 
    requireRole(ROLES.DOCENTE), 
    PropostaController.create
);

// PUT /api/propostas/:id - Update proposta (DOCENTE only, own proposals)
router.put('/:id', 
    authenticateToken, 
    requireRole(ROLES.DOCENTE), 
    PropostaController.update
);

// DELETE /api/propostas/:id - Delete proposta (DOCENTE only, own proposals)
router.delete('/:id', 
    authenticateToken, 
    requireRole(ROLES.DOCENTE), 
    PropostaController.delete
);

module.exports = router;
