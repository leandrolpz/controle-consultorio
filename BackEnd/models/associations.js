const Especialidade = require('./especialidade');
const Medico = require('./medico');
const Paciente = require('./paciente');
const Atendente = require('./atendente');
const Consulta = require('./consulta');
const Pagamento = require('./Pagamento');

// Médico pertence a uma Especialidade
Medico.belongsTo(Especialidade, {
  foreignKey: 'especialidade_id',
  as: 'especialidade'
});

// Especialidade tem muitos Médicos
Especialidade.hasMany(Medico, {
  foreignKey: 'especialidade_id',
  as: 'medicos'
});

// Consulta pertence a um Paciente
Consulta.belongsTo(Paciente, {
  foreignKey: 'paciente_id',
  as: 'paciente'
});

// Consulta pertence a um Médico
Consulta.belongsTo(Medico, {
  foreignKey: 'medico_id',
  as: 'medico'
});

// Consulta pertence a um Atendente
Consulta.belongsTo(Atendente, {
  foreignKey: 'atendente_id',
  as: 'atendente'
});

// Pagamento pertence a uma Consulta
Pagamento.belongsTo(Consulta, {
  foreignKey: 'consulta_id',
  as: 'consulta'
});

// Consulta tem um Pagamento (one-to-one)
Consulta.hasOne(Pagamento, {
  foreignKey: 'consulta_id',
  as: 'pagamento'
});

// Paciente tem muitas Consultas
Paciente.hasMany(Consulta, {
  foreignKey: 'paciente_id',
  as: 'consultas'
});

// Médico tem muitas Consultas
Medico.hasMany(Consulta, {
  foreignKey: 'medico_id',
  as: 'consultas'
});

module.exports = {
  Especialidade,
  Medico,
  Paciente,
  Atendente,
  Consulta,
  Pagamento
};