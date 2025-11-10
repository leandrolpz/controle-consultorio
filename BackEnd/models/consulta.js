const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consulta = sequelize.define('Consulta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data_consulta: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora_consulta: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('agendada', 'realizada', 'cancelada'),
    defaultValue: 'agendada'
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  valor_consulta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'consultas',
  timestamps: true
});

module.exports = Consulta;