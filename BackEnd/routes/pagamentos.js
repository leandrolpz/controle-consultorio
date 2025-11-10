const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.get('/', pagamentoController.listarPagamentos);
router.get('/:id', pagamentoController.obterPagamento);
router.post('/', pagamentoController.criarPagamento);
router.put('/:id', pagamentoController.atualizarPagamento);
router.delete('/:id', pagamentoController.excluirPagamento);

module.exports = router;