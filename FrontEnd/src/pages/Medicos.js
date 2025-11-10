import React, { useState, useEffect } from 'react';
import {
  Container, Table, Button, Alert, Spinner,
  Modal, Form, Row, Col, Card, Badge
} from 'react-bootstrap';
import { medicoService, especialidadeService } from '../services/api';

const Medicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEspecialidadeModal, setShowEspecialidadeModal] = useState(false);
  const [editingMedico, setEditingMedico] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    crm: '',
    telefone: '',
    email: '',
    especialidade_id: ''
  });
  const [novaEspecialidade, setNovaEspecialidade] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [medicosRes, especialidadesRes] = await Promise.all([
        medicoService.listar(),
        especialidadeService.listar()
      ]);
      
      setMedicos(medicosRes.data);
      setEspecialidades(especialidadesRes.data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar dados. Verifique se o servidor está rodando.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMedico) {
        await medicoService.atualizar(editingMedico.id, formData);
      } else {
        await medicoService.criar(formData);
      }
      setShowModal(false);
      setEditingMedico(null);
      resetForm();
      carregarDados();
    } catch (err) {
      setError(`Erro ao ${editingMedico ? 'atualizar' : 'criar'} médico`);
    }
  };

  const handleAddEspecialidade = async (e) => {
    e.preventDefault();
    try {
      await especialidadeService.criar({ nome: novaEspecialidade });
      setNovaEspecialidade('');
      setShowEspecialidadeModal(false);
      carregarDados();
    } catch (err) {
      setError('Erro ao criar especialidade');
    }
  };

  const handleEdit = (medico) => {
    setEditingMedico(medico);
    setFormData({
      nome: medico.nome,
      crm: medico.crm,
      telefone: medico.telefone || '',
      email: medico.email || '',
      especialidade_id: medico.especialidade_id || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      try {
        await medicoService.excluir(id);
        carregarDados();
      } catch (err) {
        setError('Erro ao excluir médico');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      crm: '',
      telefone: '',
      email: '',
      especialidade_id: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMedico(null);
    resetForm();
  };

  const contarPorEspecialidade = (especialidadeId) => {
    return medicos.filter(m => m.especialidade_id === especialidadeId).length;
  };

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <Spinner animation="border" role="status" className="me-2" />
          Carregando médicos...
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Médicos</h2>
        <div>
          <Button 
            variant="outline-secondary" 
            className="me-2"
            onClick={() => setShowEspecialidadeModal(true)}
          >
            Nova Especialidade
          </Button>
          <Button variant="success" onClick={() => setShowModal(true)}>
            Novo Médico
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-primary mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>TOTAL</div>
              <Card.Title className="h5">{medicos.length}</Card.Title>
              <Card.Text className="text-muted small">Médicos Cadastrados</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-success mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>ESPECIALIDADES</div>
              <Card.Title className="h5">{especialidades.length}</Card.Title>
              <Card.Text className="text-muted small">Especialidades</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-info mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>ATIVAS</div>
              <Card.Title className="h5">
                {[...new Set(medicos.map(m => m.especialidade_id))].length}
              </Card.Title>
              <Card.Text className="text-muted small">Especialidades Ativas</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-warning mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>CONTATO</div>
              <Card.Title className="h5">
                {medicos.filter(m => m.email && m.email.trim() !== '').length}
              </Card.Title>
              <Card.Text className="text-muted small">Com E-mail</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {medicos.length === 0 ? (
        <Alert variant="info">
          Nenhum médico cadastrado. Clique em "Novo Médico" para começar.
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Médico</th>
                <th>CRM</th>
                <th>Especialidade</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th width="120">Ações</th>
              </tr>
            </thead>
            <tbody>
              {medicos.map(medico => (
                <tr key={medico.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div 
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
                      >
                        {medico.nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                      <div>
                        <strong>{medico.nome}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge bg="secondary">{medico.crm}</Badge>
                  </td>
                  <td>
                    {medico.especialidade ? (
                      <Badge bg="success">{medico.especialidade.nome}</Badge>
                    ) : (
                      <Badge bg="warning">Sem especialidade</Badge>
                    )}
                  </td>
                  <td>
                    {medico.telefone ? (
                      <a href={`tel:${medico.telefone}`} className="text-decoration-none">
                        {medico.telefone}
                      </a>
                    ) : (
                      <span className="text-muted">Não informado</span>
                    )}
                  </td>
                  <td>
                    {medico.email ? (
                      <a href={`mailto:${medico.email}`} className="text-decoration-none">
                        {medico.email}
                      </a>
                    ) : (
                      <span className="text-muted">Não informado</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm" role="group">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEdit(medico)}
                        title="Editar médico"
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(medico.id)}
                        title="Excluir médico"
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Especialidades em Cards */}
      {especialidades.length > 0 && (
        <Row className="mt-5">
          <Col>
            <h5 className="mb-3">Distribuição por Especialidade</h5>
            <Row>
              {especialidades.map(especialidade => (
                <Col md={3} key={especialidade.id} className="mb-3">
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="text-center">
                      <div className="text-primary mb-2" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {especialidade.nome}
                      </div>
                      <div className="h4 text-dark">{contarPorEspecialidade(especialidade.id)}</div>
                      <div className="text-muted small">Médicos</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {/* Modal Médico */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingMedico ? 'Editar Médico' : 'Novo Médico'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome Completo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome completo"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>CRM *</Form.Label>
                  <Form.Control
                    type="text"
                    name="crm"
                    value={formData.crm}
                    onChange={handleChange}
                    placeholder="Ex: SP-123456"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@exemplo.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Especialidade *</Form.Label>
              <div className="d-flex gap-2">
                <Form.Select
                  name="especialidade_id"
                  value={formData.especialidade_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma especialidade</option>
                  {especialidades.map(esp => (
                    <option key={esp.id} value={esp.id}>
                      {esp.nome}
                    </option>
                  ))}
                </Form.Select>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setShowEspecialidadeModal(true)}
                  title="Adicionar nova especialidade"
                >
                  +
                </Button>
              </div>
            </Form.Group>

            <div className="text-muted small">
              * Campos obrigatórios
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingMedico ? 'Atualizar' : 'Cadastrar'} Médico
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Especialidade */}
      <Modal show={showEspecialidadeModal} onHide={() => setShowEspecialidadeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Especialidade</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddEspecialidade}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Especialidade</Form.Label>
              <Form.Control
                type="text"
                value={novaEspecialidade}
                onChange={(e) => setNovaEspecialidade(e.target.value)}
                placeholder="Ex: Cardiologia, Pediatria..."
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowEspecialidadeModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar Especialidade
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Medicos;