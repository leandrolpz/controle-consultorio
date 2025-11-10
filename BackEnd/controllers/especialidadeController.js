const { Especialidade } = require('../models/associations');

const especialidadeController = {
  async listarEspecialidades(req, res) {
    try {
      const especialidades = await Especialidade.findAll({
        order: [['nome', 'ASC']]
      });
      res.json(especialidades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obterEspecialidade(req, res) {
    try {
      const especialidade = await Especialidade.findByPk(req.params.id);
      if (!especialidade) {
        return res.status(404).json({ error: 'Especialidade não encontrada' });
      }
      res.json(especialidade);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criarEspecialidade(req, res) {
    try {
      const novaEspecialidade = await Especialidade.create(req.body);
      res.status(201).json(novaEspecialidade);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizarEspecialidade(req, res) {
    try {
      const especialidade = await Especialidade.findByPk(req.params.id);
      if (!especialidade) {
        return res.status(404).json({ error: 'Especialidade não encontrada' });
      }
      await especialidade.update(req.body);
      res.json(especialidade);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async excluirEspecialidade(req, res) {
    try {
      const especialidade = await Especialidade.findByPk(req.params.id);
      if (!especialidade) {
        return res.status(404).json({ error: 'Especialidade não encontrada' });
      }
      await especialidade.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = especialidadeController;