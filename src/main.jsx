// Importa React e ReactDOM para renderizar a aplicação
import React from 'react';
import { createRoot } from 'react-dom/client';

// Adicione esta linha para importar o componente App
import App from './App.jsx';

import "./estilos/theme.css";

// Localiza o elemento com id 'root' para montar a aplicação
const rootElement = document.getElementById("root"); 
// Cria a raiz React com o elemento encontrado
const root = createRoot(rootElement); // Inicializa a raiz do React

// Renderiza o componente App dentro de StrictMode para melhores avisos de desenvolvimento
root.render( // Chama o método render
  <React.StrictMode> {/* Ativa verificações adicionais em modo desenvolvimento */}
    <App /> {/* Renderiza o componente principal */}
  </React.StrictMode> // Fecha o StrictMode
); // Finaliza a chamada de render