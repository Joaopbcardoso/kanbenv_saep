import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../src/style/reset.css'
import '../src/style/App.css'
import Cadastro from './pages/Cadastro';
import CadastroTarefa from './pages/CadastroTarefa';
import Gerenciador from './pages/Gerenciador';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/cadastrar-tarefas" element={<CadastroTarefa />} />
        <Route path="/gerenciar-tarefas" element={<Gerenciador />} />
      </Routes>
    </Router>
  );
}
// Exporta o componente App como padrão
export default App;