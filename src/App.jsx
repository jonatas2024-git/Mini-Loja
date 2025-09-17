// Componente principal com roteamento para Catálogo e Kanban
import { useEffect, useMemo, useState } from 'react'; // Importa React e hooks
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Importa componentes de roteamento
import Navbar from "./componentes/Navbar.jsx";
import Catalog from './pages/Catalog.jsx'; // Importa a página de catálogo
import Kanban from './pages/Kanban.jsx'; // Importa a página de kanban
import styles from './App.module.css'; // Importa o CSS Module do App

// Dados simulados dos produtos (reaproveitados no Catálogo)
const PRODUCTS = [ // Define 6 produtos conforme o enunciado
  { id: 1, title: 'Fone Bluetooth Pro Max com Cancelamento de Ruído', price: 499.9, rating: 4.6, tag: 'Novo', image: 'https://m.media-amazon.com/images/I/51v0UFOTCrL._AC_SX679_.jpg' }, // Produto 1
  { id: 2, title: 'Teclado Mecânico RGB Hot-Swap ABNT2', price: 329.0, rating: 4.8, tag: 'Promo', image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/nqtfawln/file.png' }, // Produto 2
  { id: 3, title: 'Mouse Gamer 26k DPI com Sensor Óptico', price: 259.9, rating: 4.5, tag: 'Novo', image: 'https://a-static.mlcdn.com.br/1500x1500/mouse-gamer-corsair-scimitar-elite-rgb-wireless-26-000-dpi/nocnocestadosunidos/buybox-cpb0ccvyhz9n/55c3ed41b6b0708accd10ca0453e9a05.jpeg' }, // Produto 3
  { id: 4, title: 'Monitor 27" 144Hz IPS QHD', price: 1899.0, rating: 4.7, tag: 'Promo', image: 'https://picsum.photos/seed/prod4/512' }, // Produto 4
  { id: 5, title: 'Webcam 1080p com Microfone e Tampa de Privacidade', price: 189.0, rating: 4.3, tag: 'Novo', image: 'https://lojagoldentec.vteximg.com.br/arquivos/ids/165750-600-600/image-1cb41f23d09e4d0fb00e5a267222f85a.jpg?v=638453246937200000' }, // Produto 5
  { id: 6, title: 'Cadeira Ergonômica com Apoio Lombar', price: 1299.0, rating: 4.4, tag: 'Promo', image: 'https://images.tcdn.com.br/img/img_prod/1313685/cadeira_de_escritrio_presidente_brizza_relax_brao_1_20250814103755_86a66b3897fb.png' } // Produto 6
]; // Fim da lista de produtos

// Função auxiliar para mapear tag para variante do botão
const buttonVariantFromTag = (tag) => { // Recebe a tag do produto
  if (tag === 'Promo') return 'solid'; // Se for promoção, destaque sólido
  if (tag === 'Novo') return 'outline'; // Se for novo, outline
  return 'ghost'; // Caso contrário, ghost
}; // Fim da função

// Componente principal App
export default function App() { // Exporta o componente padrão
  const [cartCount, setCartCount] = useState(0); // Estado global do carrinho
  const [theme, setTheme] = useState('light'); // Estado do tema atual

  // Efeito para aplicar tema salvo e atributo data-theme
  useEffect(() => { // Executa após montagem
    const saved = localStorage.getItem('theme'); // Lê do localStorage
    const initial = saved === 'dark' ? 'dark' : 'light'; // Garante valor válido
    setTheme(initial); // Atualiza estado
    document.documentElement.setAttribute('data-theme', initial); // Aplica atributo
  }, []); // Executa uma vez

  // Alterna tema com persistência
  const toggleTheme = () => { // Função para alternar tema
    const next = theme === 'light' ? 'dark' : 'light'; // Calcula próximo
    setTheme(next); // Atualiza estado
    localStorage.setItem('theme', next); // Persiste
    document.documentElement.setAttribute('data-theme', next); // Aplica
  }; // Fim do toggle

  // Prepara produtos com variante de botão
  const productsWithVariant = useMemo(() => { // Memoriza para performance
    return PRODUCTS.map(p => ({ ...p, buttonVariant: buttonVariantFromTag(p.tag) })); // Adiciona campo
  }, []); // Sem dependências

  // Handler para adicionar ao carrinho (passado ao Catálogo)
  const handleAdd = () => { // Incrementa carrinho
    setCartCount((c) => c + 1); // Soma 1 ao contador
  }; // Fim do handler

  // Renderização com Router
  return ( // Inicia JSX
    <BrowserRouter> {/* Envolve a aplicação com o roteador */}
      <div className={styles.page}> {/* Contêiner raiz com tema */}
        <Navbar // Navbar fixa
          cartCount={cartCount} // Quantidade do carrinho
          theme={theme} // Tema atual
          onToggleTheme={toggleTheme} // Alternância de tema
        /> {/* Fim Navbar */}

        <main className={styles.main} tabIndex={-1}> {/* Área principal, focável programaticamente */}
          <Routes> {/* Define as rotas */}
            <Route // Rota do catálogo de produtos
              path="/" // Caminho raiz
              element={ // Elemento a renderizar
                <Catalog // Componente de página de catálogo
                  products={productsWithVariant} // Lista de produtos já com variantes
                  onAdd={handleAdd} // Handler de adicionar ao carrinho
                /> // Fecha Catalog
              } // Fecha element
            /> {/* Fim da rota do catálogo */}

            <Route // Rota do quadro Kanban
              path="/kanban" // Caminho /kanban
              element={<Kanban />} // Renderiza o componente Kanban
            /> {/* Fim da rota do Kanban */}

            <Route // Rota coringa para redirecionar
              path="*" // Qualquer outra rota
              element={<Navigate to="/" replace />} // Redireciona para a raiz
            /> {/* Fim da rota coringa */}
          </Routes> {/* Fim das rotas */}
        </main> {/* Fim do main */}
      </div> {/* Fim do contêiner raiz */}
    </BrowserRouter> // Fecha BrowserRouter
  ); // Fim do retorno
} // Fim do componente App
