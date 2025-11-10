const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medico = sequelize.define('Medico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  crm: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
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
  tableName: 'medicos',
  timestamps: true
});

module.exports = Medico;