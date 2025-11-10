import React, { useState, useEffect } from 'react';
import {
  Container, Table, Button, Alert, Spinner,
  Modal, Form, Row, Col, Card, Badge
} from 'react-bootstrap';
import { atendenteService } from '../services/api';

const Atendentes = () => {
  const [atendentes, setAtendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAtendente, setEditingAtendente] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    funcao: '',
    telefone: '',
    email: ''
  });

  const funcoes = [
    'Recepção',
    'Atendimento',
    'Apoio',
    'Administrativo',
    'Coordenação'
  ];

  useEffect(() => {
    carregarAtendentes();
  }, []);

  const carregarAtendentes = async () => {
    try {
      setLoading(true);
      const response = await atendenteService.listar();
      setAtendentes(response.data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar atendentes. Verifique se o servidor está rodando.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAtendente) {
        await atendenteService.atualizar(editingAtendente.id, formData);
      } else {
        await atendenteService.criar(formData);
      }
      setShowModal(false);
      setEditingAtendente(null);
      resetForm();
      carregarAtendentes();
    } catch (err) {
      setError(`Erro ao ${editingAtendente ? 'atualizar' : 'criar'} atendente`);
    }
  };

  const handleEdit = (atendente) => {
    setEditingAtendente(atendente);
    setFormData({
      nome: atendente.nome,
      funcao: atendente.funcao || '',
      telefone: atendente.telefone || '',
      email: atendente.email || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este atendente?')) {
      try {
        await atendenteService.excluir(id);
        carregarAtendentes();
      } catch (err) {
        setError('Erro ao excluir atendente');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
    funcao: '',
      telefone: '',
      email: ''
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
    setEditingAtendente(null);
    resetForm();
  };

  const contarPorFuncao = (funcao) => {
    return atendentes.filter(a => a.funcao === funcao).length;
  };

  const getFuncaoBadge = (funcao) => {
    const variants = {
      'Recepção': 'primary',
      'Atendimento': 'success',
      'Apoio': 'info',
      'Administrativo': 'warning',
      'Coordenação': 'danger'
    };
    return (
      <Badge bg={variants[funcao] || 'secondary'}>
        {funcao}
      </Badge>
    );
  };

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <Spinner animation="border" role="status" className="me-2" />
          Carregando atendentes...
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Atendentes</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          Novo Atendente
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Row className="mb-4">
        <Col md={2}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-primary mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>TOTAL</div>
              <Card.Title className="h5">{atendentes.length}</Card.Title>
              <Card.Text className="text-muted small">Atendentes</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {funcoes.map(funcao => (
          <Col md={2} key={funcao}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body className="py-3">
                <div className="text-secondary mb-2" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {funcao.toUpperCase()}
                </div>
                <Card.Title className="h5">{contarPorFuncao(funcao)}</Card.Title>
                <Card.Text className="text-muted small">
                  {contarPorFuncao(funcao) === 1 ? 'Atendente' : 'Atendentes'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {atendentes.length === 0 ? (
        <Alert variant="info">
          Nenhum atendente cadastrado. Clique em "Novo Atendente" para começar.
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Atendente</th>
                <th>Função</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Data Cadastro</th>
                <th width="120">Ações</th>
              </tr>
            </thead>
            <tbody>
              {atendentes.map(atendente => (
                <tr key={atendente.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div 
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
                      >
                        {atendente.nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                      <div>
                        <strong>{atendente.nome}</strong>
                      </div>
                    </div>
                  </td>
                  <td>{getFuncaoBadge(atendente.funcao)}</td>
                  <td>
                    {atendente.telefone ? (
                      <a href={`tel:${atendente.telefone}`} className="text-decoration-none">
                        {atendente.telefone}
                      </a>
                    ) : (
                      <span className="text-muted">Não informado</span>
                    )}
                  </td>
                  <td>
                    {atendente.email ? (
                      <a href={`mailto:${atendente.email}`} className="text-decoration-none">
                        {atendente.email}
                      </a>
                    ) : (
                      <span className="text-muted">Não informado</span>
                    )}
                  </td>
                  <td>
                    {atendente.createdAt ? (
                      formatarData(atendente.createdAt)
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm" role="group">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEdit(atendente)}
                        title="Editar atendente"
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(atendente.id)}
                        title="Excluir atendente"
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

      {/* Modal Atendente */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAtendente ? 'Editar Atendente' : 'Novo Atendente'}
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
                  <Form.Label>Função *</Form.Label>
                  <Form.Select
                    name="funcao"
                    value={formData.funcao}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione a função</option>
                    {funcoes.map(funcao => (
                      <option key={funcao} value={funcao}>
                        {funcao}
                      </option>
                    ))}
                  </Form.Select>
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

            <div className="text-muted small">
              * Campos obrigatórios
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingAtendente ? 'Atualizar' : 'Cadastrar'} Atendente
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Atendentes;