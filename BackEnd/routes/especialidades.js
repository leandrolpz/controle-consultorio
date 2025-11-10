const express = require('express');
const router = express.Router();
const especialidadeController = require('../controllers/especialidadeController');

router.get('/', especialidadeController.listarEspecialidades);
router.get('/:id', especialidadeController.obterEspecialidade);
router.post('/', especialidadeController.criarEspecialidade);
router.put('/:id', especialidadeController.atualizarEspecialidade);
router.delete('/:id', especialidadeController.excluirEspecialidade);

module.exports = router;