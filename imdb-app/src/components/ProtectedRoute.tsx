import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Se o token não estiver presente, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se o token estiver presente, renderiza o componente filho
  return children;
};

export default ProtectedRoute;
