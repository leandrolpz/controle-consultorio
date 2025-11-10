const { Paciente } = require('../models/associations');

const pacienteController = {
  async listarPacientes(req, res) {
    try {
      const pacientes = await Paciente.findAll({
        order: [['nome', 'ASC']]
      });
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obterPaciente(req, res) {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      res.json(paciente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criarPaciente(req, res) {
    try {
      const novoPaciente = await Paciente.create(req.body);
      res.status(201).json(novoPaciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizarPaciente(req, res) {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      await paciente.update(req.body);
      res.json(paciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async excluirPaciente(req, res) {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      await paciente.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = pacienteController;