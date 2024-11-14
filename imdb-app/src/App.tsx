import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MovieListPage from './pages/MovieListPage';
import ProtectedRoute from './components/ProtectedRoute';
import CustomAppBar from './components/AppBar';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <CustomAppBar isLoggedIn={!!token} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={setToken} />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MovieListPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
