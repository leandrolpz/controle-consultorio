const { Pagamento, Consulta } = require('../models/associations');

const pagamentoController = {
  async listarPagamentos(req, res) {
    try {
      const pagamentos = await Pagamento.findAll({
        include: [{ model: Consulta, as: 'consulta' }],
        order: [['data_pagamento', 'DESC']]
      });
      res.json(pagamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obterPagamento(req, res) {
    try {
      const pagamento = await Pagamento.findByPk(req.params.id, {
        include: [{ model: Consulta, as: 'consulta' }]
      });
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criarPagamento(req, res) {
    try {
      const novoPagamento = await Pagamento.create(req.body);
      res.status(201).json(novoPagamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizarPagamento(req, res) {
    try {
      const pagamento = await Pagamento.findByPk(req.params.id);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      await pagamento.update(req.body);
      res.json(pagamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async excluirPagamento(req, res) {
    try {
      const pagamento = await Pagamento.findByPk(req.params.id);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      await pagamento.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = pagamentoController;