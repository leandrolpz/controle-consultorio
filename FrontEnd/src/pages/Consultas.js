import React, { useState, useEffect } from 'react';
import { 
  Container, Table, Button, Alert, Spinner, 
  Modal, Form, Row, Col, Card, Badge 
} from 'react-bootstrap';
import { 
  FaEye, 
  FaTrash, 
  FaEdit, 
  FaCalendarAlt, 
  FaUser, 
  FaUserMd, 
  FaUserTie,
  FaMoneyBillWave,
  FaStethoscope,
  FaClipboardList,
  FaPlus,
  FaPhone,
  FaIdCard,
  FaBriefcase,
  FaCreditCard,
  FaNotesMedical
} from 'react-icons/fa';
import { consultaService, pacienteService, medicoService, atendenteService } from '../services/api';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [atendentes, setAtendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [formData, setFormData] = useState({
    data_consulta: '',
    hora_consulta: '',
    status: 'agendada',
    observacoes: '',
    valor_consulta: '',
    paciente_id: '',
    medico_id: '',
    atendente_id: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [consultasRes, pacientesRes, medicosRes, atendentesRes] = await Promise.all([
        consultaService.listar(),
        pacienteService.listar(),
        medicoService.listar(),
        atendenteService.listar()
      ]);
      
      setConsultas(consultasRes.data);
      setPacientes(pacientesRes.data);
      setMedicos(medicosRes.data);
      setAtendentes(atendentesRes.data);
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
      await consultaService.criar(formData);
      setShowModal(false);
      setFormData({
        data_consulta: '',
        hora_consulta: '',
        status: 'agendada',
        observacoes: '',
        valor_consulta: '',
        paciente_id: '',
        medico_id: '',
        atendente_id: ''
      });
      carregarDados();
    } catch (err) {
      setError('Erro ao criar consulta');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const visualizarDetalhes = (consulta) => {
    setConsultaSelecionada(consulta);
    setShowDetalhesModal(true);
  };

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const formatarDataCompleta = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatarHora = (horaString) => {
    return horaString?.substring(0, 5);
  };

  const getStatusBadge = (status) => {
    const variants = {
      agendada: 'warning',
      realizada: 'success',
      cancelada: 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const getStatusTexto = (status) => {
    const textos = {
      agendada: 'Consulta agendada',
      realizada: 'Consulta realizada',
      cancelada: 'Consulta cancelada'
    };
    return textos[status] || status;
  };

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <Spinner animation="border" role="status" className="me-2" />
          Carregando consultas...
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaCalendarAlt className="me-2" />
          Consultas
        </h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <FaPlus className="me-1" />
          Nova Consulta
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <FaCalendarAlt size={24} className="text-primary mb-2" />
              <Card.Title className="h5">{consultas.length}</Card.Title>
              <Card.Text className="text-muted small">Total de Consultas</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <FaCalendarAlt size={24} className="text-warning mb-2" />
              <Card.Title className="h5">
                {consultas.filter(c => c.status === 'agendada').length}
              </Card.Title>
              <Card.Text className="text-muted small">Agendadas</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <FaCalendarAlt size={24} className="text-success mb-2" />
              <Card.Title className="h5">
                {consultas.filter(c => c.status === 'realizada').length}
              </Card.Title>
              <Card.Text className="text-muted small">Realizadas</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-3">
              <FaCalendarAlt size={24} className="text-danger mb-2" />
              <Card.Title className="h5">
                {consultas.filter(c => c.status === 'cancelada').length}
              </Card.Title>
              <Card.Text className="text-muted small">Canceladas</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {consultas.length === 0 ? (
        <Alert variant="info" className="text-center">
          <FaCalendarAlt size={20} className="me-2" />
          Nenhuma consulta encontrada. Clique em "Nova Consulta" para começar.
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Status</th>
                <th>Valor</th>
                <th width="140">Ações</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map(consulta => (
                <tr key={consulta.id}>
                  <td className="fw-semibold">{formatarData(consulta.data_consulta)}</td>
                  <td>{formatarHora(consulta.hora_consulta)}</td>
                  <td>
                    <FaUser className="me-1 text-muted" size={12} />
                    {consulta.paciente?.nome || 'N/A'}
                  </td>
                  <td>
                    <FaUserMd className="me-1 text-muted" size={12} />
                    {consulta.medico?.nome || 'N/A'}
                  </td>
                  <td>{getStatusBadge(consulta.status)}</td>
                  <td className="fw-semibold text-success">
                    <FaMoneyBillWave className="me-1" size={12} />
                    R$ {consulta.valor_consulta}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm" role="group">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => visualizarDetalhes(consulta)}
                        title="Ver detalhes"
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        title="Editar consulta"
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        title="Excluir consulta"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal Nova Consulta */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCalendarAlt className="me-2" />
            Nova Consulta
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCalendarAlt className="me-1" />
                    Data da Consulta
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="data_consulta"
                    value={formData.data_consulta}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCalendarAlt className="me-1" />
                    Hora
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="hora_consulta"
                    value={formData.hora_consulta}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-1" />
                    Paciente
                  </Form.Label>
                  <Form.Select
                    name="paciente_id"
                    value={formData.paciente_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um paciente</option>
                    {pacientes.map(paciente => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUserMd className="me-1" />
                    Médico
                  </Form.Label>
                  <Form.Select
                    name="medico_id"
                    value={formData.medico_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um médico</option>
                    {medicos.map(medico => (
                      <option key={medico.id} value={medico.id}>
                        {medico.nome} - {medico.especialidade?.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUserTie className="me-1" />
                    Atendente
                  </Form.Label>
                  <Form.Select
                    name="atendente_id"
                    value={formData.atendente_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um atendente</option>
                    {atendentes.map(atendente => (
                      <option key={atendente.id} value={atendente.id}>
                        {atendente.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMoneyBillWave className="me-1" />
                    Valor (R$)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="valor_consulta"
                    value={formData.valor_consulta}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="agendada">Agendada</option>
                <option value="realizada">Realizada</option>
                <option value="cancelada">Cancelada</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaNotesMedical className="me-1" />
                Observações
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                placeholder="Digite observações sobre a consulta..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              <FaCalendarAlt className="me-1" />
              Agendar Consulta
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Detalhes da Consulta */}
      <Modal show={showDetalhesModal} onHide={() => setShowDetalhesModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaClipboardList className="me-2" />
            Detalhes da Consulta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {consultaSelecionada && (
            <div>
              <Row className="mb-4">
                <Col md={8}>
                  <h5 className="text-primary mb-3">
                    <FaCalendarAlt className="me-2" />
                    Informações da Consulta
                  </h5>
                  <Table bordered className="table-sm">
                    <tbody>
                      <tr>
                        <td className="fw-semibold" width="30%">Data:</td>
                        <td>{formatarDataCompleta(consultaSelecionada.data_consulta)}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Hora:</td>
                        <td>{formatarHora(consultaSelecionada.hora_consulta)}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Status:</td>
                        <td>{getStatusBadge(consultaSelecionada.status)}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Valor:</td>
                        <td className="fw-semibold text-success">
                          <FaMoneyBillWave className="me-1" />
                          R$ {consultaSelecionada.valor_consulta}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Observações:</td>
                        <td>
                          {consultaSelecionada.observacoes || 
                            <span className="text-muted">Nenhuma observação</span>
                          }
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={4}>
                  <div className="text-center p-3 bg-light rounded">
                    <FaStethoscope size={48} className="text-primary mb-3" />
                    <h6>Consulta #{consultaSelecionada.id}</h6>
                    <p className="text-muted small">
                      {getStatusTexto(consultaSelecionada.status)}
                    </p>
                  </div>
                </Col>
              </Row>

              <hr />

              <Row>
                <Col md={4}>
                  <h6 className="text-success mb-3">
                    <FaUser className="me-2" />
                    Paciente
                  </h6>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center">
                      <FaUser size={24} className="text-success mb-2" />
                      <strong className="d-block">{consultaSelecionada.paciente?.nome || 'N/A'}</strong>
                      <div className="mt-2 small text-muted">
                        {consultaSelecionada.paciente?.telefone && (
                          <div className="d-flex align-items-center justify-content-center">
                            <FaPhone className="me-1" size={12} />
                            {consultaSelecionada.paciente.telefone}
                          </div>
                        )}
                        {consultaSelecionada.paciente?.convenio && (
                          <div className="mt-1">
                            <Badge bg="success" className="mt-1">
                              {consultaSelecionada.paciente.convenio}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <h6 className="text-primary mb-3">
                    <FaUserMd className="me-2" />
                    Médico
                  </h6>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center">
                      <FaUserMd size={24} className="text-primary mb-2" />
                      <strong className="d-block">{consultaSelecionada.medico?.nome || 'N/A'}</strong>
                      <div className="mt-2 small text-muted">
                        {consultaSelecionada.medico?.crm && (
                          <div className="d-flex align-items-center justify-content-center">
                            <FaIdCard className="me-1" size={12} />
                            {consultaSelecionada.medico.crm}
                          </div>
                        )}
                        {consultaSelecionada.medico?.especialidade?.nome && (
                          <div className="mt-1">
                            <Badge bg="primary" className="mt-1">
                              {consultaSelecionada.medico.especialidade.nome}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <h6 className="text-warning mb-3">
                    <FaUserTie className="me-2" />
                    Atendente
                  </h6>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center">
                      <FaUserTie size={24} className="text-warning mb-2" />
                      <strong className="d-block">{consultaSelecionada.atendente?.nome || 'N/A'}</strong>
                      <div className="mt-2 small text-muted">
                        {consultaSelecionada.atendente?.funcao && (
                          <div className="d-flex align-items-center justify-content-center">
                            <FaBriefcase className="me-1" size={12} />
                            {consultaSelecionada.atendente.funcao}
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {consultaSelecionada.pagamento && (
                <>
                  <hr />
                  <Row>
                    <Col>
                      <h6 className="text-success mb-3">
                        <FaCreditCard className="me-2" />
                        Pagamento
                      </h6>
                      <Card className="border-0 shadow-sm">
                        <Card.Body>
                          <Row>
                            <Col md={3}>
                              <strong>Status:</strong> {consultaSelecionada.pagamento.status}
                            </Col>
                            <Col md={3}>
                              <strong>Forma:</strong> {consultaSelecionada.pagamento.forma_pagamento}
                            </Col>
                            <Col md={3}>
                              <strong>Valor Pago:</strong> R$ {consultaSelecionada.pagamento.valor_pago}
                            </Col>
                            <Col md={3}>
                              <strong>Data:</strong> {formatarData(consultaSelecionada.pagamento.data_pagamento)}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDetalhesModal(false)}>
            Fechar
          </Button>
          <Button variant="primary">
            <FaEdit className="me-1" />
            Editar Consulta
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Consultas;