const express = require('express');
const router = express.Router();
const atendenteController = require('../controllers/atendenteController');

router.get('/', atendenteController.listarAtendentes);
router.get('/:id', atendenteController.obterAtendente);
router.post('/', atendenteController.criarAtendente);
router.put('/:id', atendenteController.atualizarAtendente);
router.delete('/:id', atendenteController.excluirAtendente);

module.exports = router;