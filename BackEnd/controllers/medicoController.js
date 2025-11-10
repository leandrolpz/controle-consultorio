const { Medico, Especialidade } = require('../models/associations');

const medicoController = {
  async listarMedicos(req, res) {
    try {
      const medicos = await Medico.findAll({
        include: [{ model: Especialidade, as: 'especialidade' }],
        order: [['nome', 'ASC']]
      });
      res.json(medicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obterMedico(req, res) {
    try {
      const medico = await Medico.findByPk(req.params.id, {
        include: [{ model: Especialidade, as: 'especialidade' }]
      });
      if (!medico) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      res.json(medico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criarMedico(req, res) {
    try {
      const novoMedico = await Medico.create(req.body);
      res.status(201).json(novoMedico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizarMedico(req, res) {
    try {
      const medico = await Medico.findByPk(req.params.id);
      if (!medico) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      await medico.update(req.body);
      res.json(medico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async excluirMedico(req, res) {
    try {
      const medico = await Medico.findByPk(req.params.id);
      if (!medico) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }
      await medico.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = medicoController;