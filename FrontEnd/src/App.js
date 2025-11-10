import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Consultas from './pages/Consultas';
import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import Atendentes from './pages/Atendentes'; // ← Adicionar esta linha
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consultas" element={<Consultas />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/medicos" element={<Medicos />} />
            <Route path="/atendentes" element={<Atendentes />} /> {/* ← Adicionar esta linha */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;