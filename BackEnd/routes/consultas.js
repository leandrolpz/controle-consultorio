const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.get('/', consultaController.listarConsultas);
router.get('/:id', consultaController.obterConsulta);
router.post('/', consultaController.criarConsulta);
router.put('/:id', consultaController.atualizarConsulta);
router.delete('/:id', consultaController.excluirConsulta);

module.exports = router;