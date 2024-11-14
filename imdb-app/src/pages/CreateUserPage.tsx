import React, { useState } from 'react';
import { createUser, setAuthToken } from '../service/http.service';
import { Role } from '../interfaces/User';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert, Grid, SelectChangeEvent } from '@mui/material';

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: Role.USER,
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<Role>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as Role,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Usuário não autenticado');
      }

      setAuthToken(token);
      await createUser(formData);
      setMessage('Usuário criado com sucesso!');
    } catch (error) {
      setMessage('Erro ao criar o usuário. Verifique os dados e tente novamente.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Criar Usuário
      </Typography>
      {message && <Alert severity="info">{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                onChange={handleSelectChange}
                fullWidth
                required
              >
                <MenuItem value={Role.USER}>User</MenuItem>
                <MenuItem value={Role.ADMIN}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Criar Usuário
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateUserPage;