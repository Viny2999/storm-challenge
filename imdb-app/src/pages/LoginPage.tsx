import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/enviroment';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLoginSuccess: (token: string, role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/v1/login`, {
        email,
        password,
      });
      const { token, role } = response.data;
      localStorage.setItem('authToken', token); // Salva o token no localStorage
      localStorage.setItem('userRole', role); // Salva a role
      onLoginSuccess(token, role);
      setError('');
      navigate('/movies'); // Redireciona para a página de filmes
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
