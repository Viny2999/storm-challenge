import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MovieListPage from './pages/MovieListPage';
import ProtectedRoute from './components/ProtectedRoute';
import CustomAppBar from './components/AppBar';
import AdminRoute from './components/AdminRoute';
import AddMoviePage from './pages/AddMoviePage';
import CreateUserPage from './pages/CreateUserPage';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedRole = localStorage.getItem('userRole');
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleLoginSuccess = (token: string, role: string) => {
    setToken(token);
    setRole(role);
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <CustomAppBar isLoggedIn={!!token} role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MovieListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-movie"
          element={
            <AdminRoute>
              <AddMoviePage />
            </AdminRoute>
          }
        />
        <Route
          path="/create-user"
          element={
            <AdminRoute>
              <CreateUserPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
