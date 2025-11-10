import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ Erro:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const consultaService = {
  listar: () => api.get('/consultas'),
  obter: (id) => api.get(`/consultas/${id}`),
  criar: (data) => api.post('/consultas', data),
  atualizar: (id, data) => api.put(`/consultas/${id}`, data),
  excluir: (id) => api.delete(`/consultas/${id}`),
};

export const pacienteService = {
  listar: () => api.get('/pacientes'),
  obter: (id) => api.get(`/pacientes/${id}`),
  criar: (data) => api.post('/pacientes', data),
  atualizar: (id, data) => api.put(`/pacientes/${id}`, data),
  excluir: (id) => api.delete(`/pacientes/${id}`),
};

export const medicoService = {
  listar: () => api.get('/medicos'),
  obter: (id) => api.get(`/medicos/${id}`),
  criar: (data) => api.post('/medicos', data),
  atualizar: (id, data) => api.put(`/medicos/${id}`, data),
  excluir: (id) => api.delete(`/medicos/${id}`),
};

export const especialidadeService = {
  listar: () => api.get('/especialidades'),
  criar: (data) => api.post('/especialidades', data),
};

export const atendenteService = {
  listar: () => api.get('/atendentes'),
  obter: (id) => api.get(`/atendentes/${id}`),
  criar: (data) => api.post('/atendentes', data),
  atualizar: (id, data) => api.put(`/atendentes/${id}`, data),
  excluir: (id) => api.delete(`/atendentes/${id}`),
};

export default api;