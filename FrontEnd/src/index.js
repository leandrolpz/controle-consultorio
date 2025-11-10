import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

// VERIFIQUE SE O ELEMENTO EXISTE ANTES DE CRIAR A ROOT
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Elemento com id 'root' não encontrado no DOM");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);