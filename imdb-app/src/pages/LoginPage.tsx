import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/http.service';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';

interface LoginPageProps {
  onLoginSuccess: (token: string, role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, role } = await login(email, password);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      onLoginSuccess(token, role);
      setError('');
      navigate('/movies');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Login
        </Button>
      </form>
      {error && (
        <Alert severity="error" style={{ marginTop: '16px' }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default LoginPage;
