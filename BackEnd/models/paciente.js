const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  endereco: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  convenio: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'pacientes',
  timestamps: true
});

module.exports = Paciente;