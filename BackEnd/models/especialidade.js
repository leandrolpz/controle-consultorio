const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Especialidade = sequelize.define('Especialidade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'especialidades',
  timestamps: true
});

module.exports = Especialidade;