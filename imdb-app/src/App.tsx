import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MovieListPage from './pages/MovieListPage';
import ProtectedRoute from './components/ProtectedRoute';
import CustomAppBar from './components/AppBar';
import AdminRoute from './components/AdminRoute';
import AddMoviePage from './pages/AddMoviePage';
import CreateUserPage from './pages/CreateUserPage';
import MovieDetailPage from './pages/MovieDetailPage';

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
        <Route path="/" element={<Navigate to="/movies" />} />
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
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MovieDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-movie"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AddMoviePage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CreateUserPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
