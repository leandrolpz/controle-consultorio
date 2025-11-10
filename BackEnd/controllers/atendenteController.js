const { Atendente } = require('../models/associations');

const atendenteController = {
  async listarAtendentes(req, res) {
    try {
      const atendentes = await Atendente.findAll({
        order: [['nome', 'ASC']]
      });
      res.json(atendentes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obterAtendente(req, res) {
    try {
      const atendente = await Atendente.findByPk(req.params.id);
      if (!atendente) {
        return res.status(404).json({ error: 'Atendente não encontrado' });
      }
      res.json(atendente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criarAtendente(req, res) {
    try {
      const novoAtendente = await Atendente.create(req.body);
      res.status(201).json(novoAtendente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizarAtendente(req, res) {
    try {
      const atendente = await Atendente.findByPk(req.params.id);
      if (!atendente) {
        return res.status(404).json({ error: 'Atendente não encontrado' });
      }
      await atendente.update(req.body);
      res.json(atendente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async excluirAtendente(req, res) {
    try {
      const atendente = await Atendente.findByPk(req.params.id);
      if (!atendente) {
        return res.status(404).json({ error: 'Atendente não encontrado' });
      }
      await atendente.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = atendenteController;