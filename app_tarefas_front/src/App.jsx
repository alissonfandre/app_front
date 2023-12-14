import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MenuSuperior from './components/MenuSuperior';
import InclusaoTarefas from './components/InclusaoTarefas';
import InclusaoUsuarios from './components/InclusaoUsuarios';
import ManutencaoTarefas from './components/ManutencaoTarefas';
import FormularioLogin from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useAuth();
  return autenticado ? children : <Navigate to="/login" />;
};


const RoutesWithAuth = () => {
  const { autenticado } = useAuth();
  

    return (
      <Router>
        {autenticado && <MenuSuperior />}
          <Routes>
            <Route path="/login" element={<FormularioLogin />} />
            <Route path="/" element={autenticado ? <Navigate to="/tarefas" /> : <FormularioLogin />} />
            <Route path="/tarefas" element={<ProtectedRoute><InclusaoTarefas /></ProtectedRoute>} />
            <Route path="/usuarios" element={<ProtectedRoute><InclusaoUsuarios /></ProtectedRoute>} />
            <Route path="/manutencao" element={<ProtectedRoute><ManutencaoTarefas /></ProtectedRoute>} />
          </Routes>
        
      </Router>
    );

};
  
const App = () => {
  return (
      <AuthProvider>
          <RoutesWithAuth/>
      </AuthProvider>
  );
};

export default App;
