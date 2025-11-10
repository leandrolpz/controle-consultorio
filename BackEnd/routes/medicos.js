const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

router.get('/', medicoController.listarMedicos);
router.get('/:id', medicoController.obterMedico);
router.post('/', medicoController.criarMedico);
router.put('/:id', medicoController.atualizarMedico);
router.delete('/:id', medicoController.excluirMedico);

module.exports = router;