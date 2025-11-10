const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Atendente = sequelize.define('Atendente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  funcao: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'atendentes',
  timestamps: true
});

module.exports = Atendente;