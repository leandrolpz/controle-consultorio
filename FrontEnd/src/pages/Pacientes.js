import React, { useState, useEffect } from 'react';
import {
  Container, Table, Button, Alert, Spinner,
  Modal, Form, Row, Col, Card, Badge
} from 'react-bootstrap';
import { pacienteService } from '../services/api';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    convenio: '',
    data_nascimento: ''
  });

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      setLoading(true);
      const response = await pacienteService.listar();
      setPacientes(response.data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar pacientes. Verifique se o servidor está rodando.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPaciente) {
        await pacienteService.atualizar(editingPaciente.id, formData);
      } else {
        await pacienteService.criar(formData);
      }
      setShowModal(false);
      setEditingPaciente(null);
      resetForm();
      carregarPacientes();
    } catch (err) {
      setError(`Erro ao ${editingPaciente ? 'atualizar' : 'criar'} paciente`);
    }
  };

  const handleEdit = (paciente) => {
    setEditingPaciente(paciente);
    setFormData({
      nome: paciente.nome,
      endereco: paciente.endereco || '',
      telefone: paciente.telefone || '',
      convenio: paciente.convenio || '',
      data_nascimento: paciente.data_nascimento ? paciente.data_nascimento.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await pacienteService.excluir(id);
        carregarPacientes();
      } catch (err) {
        setError('Erro ao excluir paciente');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      endereco: '',
      telefone: '',
      convenio: '',
      data_nascimento: ''
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
    setEditingPaciente(null);
    resetForm();
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return '-';
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const formatarData = (dataString) => {
    if (!dataString) return '-';
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <Spinner animation="border" role="status" className="me-2" />
          Carregando pacientes...
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Pacientes</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          Novo Paciente
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-primary mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>TOTAL</div>
              <Card.Title className="h5">{pacientes.length}</Card.Title>
              <Card.Text className="text-muted small">Pacientes Cadastrados</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-success mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>CONVÊNIO</div>
              <Card.Title className="h5">
                {pacientes.filter(p => p.convenio && p.convenio.trim() !== '').length}
              </Card.Title>
              <Card.Text className="text-muted small">Com Convênio</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-info mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>PARTICULAR</div>
              <Card.Title className="h5">
                {pacientes.filter(p => !p.convenio || p.convenio.trim() === '').length}
              </Card.Title>
              <Card.Text className="text-muted small">Particular</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="text-warning mb-2" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>CONTATO</div>
              <Card.Title className="h5">
                {pacientes.filter(p => p.telefone && p.telefone.trim() !== '').length}
              </Card.Title>
              <Card.Text className="text-muted small">Com Telefone</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {pacientes.length === 0 ? (
        <Alert variant="info">
          Nenhum paciente cadastrado. Clique em "Novo Paciente" para começar.
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Convênio</th>
                <th>Data Nasc.</th>
                <th>Idade</th>
                <th>Endereço</th>
                <th width="120">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map(paciente => (
                <tr key={paciente.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div 
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
                      >
                        {paciente.nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                      <div>
                        <strong>{paciente.nome}</strong>
                        {paciente.convenio && (
                          <Badge bg="success" className="ms-2">Convênio</Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    {paciente.telefone ? (
                      <a href={`tel:${paciente.telefone}`} className="text-decoration-none">
                        {paciente.telefone}
                      </a>
                    ) : (
                      <span className="text-muted">Não informado</span>
                    )}
                  </td>
                  <td>
                    {paciente.convenio ? (
                      <Badge bg="success">{paciente.convenio}</Badge>
                    ) : (
                      <Badge bg="secondary">Particular</Badge>
                    )}
                  </td>
                  <td>
                    {paciente.data_nascimento ? (
                      formatarData(paciente.data_nascimento)
                    ) : (
                      <span className="text-muted">Não informada</span>
                    )}
                  </td>
                  <td>
                    <Badge bg={paciente.data_nascimento ? "info" : "secondary"}>
                      {calcularIdade(paciente.data_nascimento)} {paciente.data_nascimento ? "anos" : "-"}
                    </Badge>
                  </td>
                  <td>
                    {paciente.endereco ? (
                      <small title={paciente.endereco}>
                        {paciente.endereco.length > 30 
                          ? `${paciente.endereco.substring(0, 30)}...`
                          : paciente.endereco
                        }
                      </small>
                    ) : (
                      <span className="text-muted">Não informado</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm" role="group">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEdit(paciente)}
                        title="Editar paciente"
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(paciente.id)}
                        title="Excluir paciente"
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

      {/* Modal Paciente */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingPaciente ? 'Editar Paciente' : 'Novo Paciente'}
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
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_nascimento"
                    value={formData.data_nascimento}
                    onChange={handleChange}
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
                  <Form.Label>Convênio</Form.Label>
                  <Form.Control
                    type="text"
                    name="convenio"
                    value={formData.convenio}
                    onChange={handleChange}
                    placeholder="Nome do convênio"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Digite o endereço completo"
              />
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
              {editingPaciente ? 'Atualizar' : 'Cadastrar'} Paciente
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Pacientes;