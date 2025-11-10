const { Consulta, Paciente, Medico, Atendente, Pagamento } = require('../models/associations');

const consultaController = {
  // Listar todas as consultas
  async listarConsultas(req, res) {
    try {
      const consultas = await Consulta.findAll({
        include: [
          { model: Paciente, as: 'paciente' },
          { model: Medico, as: 'medico' },
          { model: Atendente, as: 'atendente' },
          { model: Pagamento, as: 'pagamento' }
        ],
        order: [['data_consulta', 'DESC']]
      });
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obter consulta por ID
  async obterConsulta(req, res) {
    try {
      const consulta = await Consulta.findByPk(req.params.id, {
        include: [
          { model: Paciente, as: 'paciente' },
          { model: Medico, as: 'medico' },
          { model: Atendente, as: 'atendente' },
          { model: Pagamento, as: 'pagamento' }
        ]
      });
      
      if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada' });
      }
      
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Criar nova consulta
  async criarConsulta(req, res) {
    try {
      const novaConsulta = await Consulta.create(req.body);
      res.status(201).json(novaConsulta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Atualizar consulta
  async atualizarConsulta(req, res) {
    try {
      const consulta = await Consulta.findByPk(req.params.id);
      
      if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada' });
      }
      
      await consulta.update(req.body);
      res.json(consulta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Excluir consulta
  async excluirConsulta(req, res) {
    try {
      const consulta = await Consulta.findByPk(req.params.id);
      
      if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada' });
      }
      
      await consulta.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = consultaController;