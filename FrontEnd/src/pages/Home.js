import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    {
      title: 'Consultas',
      count: '0',
      description: 'Agende e gerencie consultas médicas',
      link: '/consultas',
      color: 'primary'
    },
    {
      title: 'Pacientes', 
      count: '0',
      description: 'Cadastre e consulte informações dos pacientes',
      link: '/pacientes',
      color: 'success'
    },
    {
      title: 'Médicos',
      count: '0',
      description: 'Administre o cadastro de médicos e especialidades',
      link: '/medicos',
      color: 'info'
    },
    {
      title: 'Atendentes',
      count: '0',
      description: 'Gerencie a equipe de atendimento',
      link: '/atendentes',
      color: 'warning'
    }
  ];

  const features = [
    {
      title: 'Agendamento Inteligente',
      description: 'Sistema completo de agendamento de consultas com controle de horários, status e confirmações automáticas.',
      color: 'primary'
    },
    {
      title: 'Gestão de Pacientes',
      description: 'Cadastro completo de pacientes com histórico médico, convênios e informações de contato centralizadas.',
      color: 'success'
    },
    {
      title: 'Corpo Clínico',
      description: 'Administração de médicos e especialidades com CRM, áreas de atuação e informações profissionais.',
      color: 'info'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-5 fw-bold mb-3">Sistema de Gestão Médica</h1>
              <p className="lead mb-4">
                Gerencie consultas, pacientes e médicos de forma eficiente e organizada. 
                Sistema completo para administração de consultórios médicos.
              </p>
              <div className="d-flex gap-3">
                <Link to="/consultas" className="btn btn-light btn-lg">
                  Iniciar Gestão
                </Link>
                <Link to="/pacientes" className="btn btn-outline-light btn-lg">
                  Ver Pacientes
                </Link>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div 
                  className="bg-white text-primary rounded d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: '120px', height: '120px', fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                  CONSULTÓRIO
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <Container className="my-5">
        <Row className="g-4">
          {stats.map((stat, index) => (
            <Col md={3} key={index}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div 
                    className={`bg-${stat.color} text-white rounded d-flex align-items-center justify-content-center mx-auto mb-3`}
                    style={{ width: '60px', height: '60px' }}
                  >
                    <span className="h5 mb-0">{stat.title.charAt(0)}</span>
                  </div>
                  <Card.Title className="h5 mb-2">{stat.title}</Card.Title>
                  <Card.Text className="text-muted small mb-3">
                    {stat.description}
                  </Card.Text>
                  <Link 
                    to={stat.link} 
                    className={`btn btn-${stat.color} btn-sm stretched-link`}
                  >
                    Acessar
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="h1 mb-3">Funcionalidades Principais</h2>
            <p className="lead text-muted">
              Todas as ferramentas necessárias para uma gestão médica eficiente
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col md={4} key={index}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div 
                    className={`text-${feature.color} mb-3`} 
                    style={{ fontSize: '2rem', fontWeight: 'bold' }}
                  >
                    {feature.title.split(' ')[0].charAt(0)}
                  </div>
                  <Card.Title className="h6 mb-3">{feature.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Quick Actions */}
      <Container className="my-5">
        <Row className="text-center mb-4">
          <Col>
            <h3 className="h2 mb-3">Ações Rápidas</h3>
            <p className="text-muted">
              Acesse rapidamente as principais funcionalidades do sistema
            </p>
          </Col>
        </Row>
        
        <Row className="g-3 justify-content-center">
          <Col md="auto">
            <Link to="/consultas" className="btn btn-primary btn-lg">
              Nova Consulta
            </Link>
          </Col>
          <Col md="auto">
            <Link to="/pacientes" className="btn btn-success btn-lg">
              Cadastrar Paciente
            </Link>
          </Col>
          <Col md="auto">
            <Link to="/medicos" className="btn btn-info btn-lg">
              Adicionar Médico
            </Link>
          </Col>
          <Col md="auto">
            <Link to="/atendentes" className="btn btn-warning btn-lg">
              Novo Atendente
            </Link>
          </Col>
        </Row>
      </Container>

      {/* System Status */}
      <Container className="my-5">
        <Row>
          <Col>
            <Card className="border-0 bg-light">
              <Card.Body className="text-center p-5">
                <h4 className="mb-3">Sistema em Funcionamento</h4>
                <p className="text-muted mb-4">
                  Todas as funcionalidades estão disponíveis e o sistema está operando normalmente.
                </p>
                <div className="d-flex justify-content-center gap-4">
                  <div className="text-center">
                    <div className="text-success fw-bold">Online</div>
                    <small className="text-muted">Status</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold">100%</div>
                    <small className="text-muted">Disponibilidade</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold">0</div>
                    <small className="text-muted">Incidentes</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;