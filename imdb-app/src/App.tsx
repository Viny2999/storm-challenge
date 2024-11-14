import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import MovieListPage from './pages/MovieListPage';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <div className="App">
      {token ? (
        <MovieListPage />
      ) : (
        <LoginPage onLoginSuccess={setToken} />
      )}
    </div>
  );
};

export default App;
