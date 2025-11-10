const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('./models/associations');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/consultas', require('./routes/consultas'));
app.use('/api/pacientes', require('./routes/pacientes'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/atendentes', require('./routes/atendentes'));
app.use('/api/especialidades', require('./routes/especialidades'));
app.use('/api/pagamentos', require('./routes/pagamentos'));

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando', timestamp: new Date() });
});

// Sincronizar com o banco e iniciar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com MySQL estabelecida!');
    
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados com o banco!');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();