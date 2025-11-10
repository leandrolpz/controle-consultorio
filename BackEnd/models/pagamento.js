const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagamento = sequelize.define('Pagamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valor_pago: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  forma_pagamento: {
    type: DataTypes.ENUM('dinheiro', 'cartao', 'pix', 'convenio'),
    allowNull: false
  },
  data_pagamento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
    defaultValue: 'pendente'
  }
}, {
  tableName: 'pagamentos',
  timestamps: true
});

module.exports = Pagamento;