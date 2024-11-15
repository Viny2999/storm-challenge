import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert, Grid, SelectChangeEvent } from '@mui/material';
import { MovieGenre } from '../interfaces/Movie';
import { createMovie, setAuthToken } from '../service/http.service';

const AddMoviePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    director: '',
    genre: MovieGenre.ACTION,
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<MovieGenre>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as MovieGenre,
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
      await createMovie(formData);
      setMessage('Filme adicionado com sucesso!');
    } catch (error) {
      setMessage('Erro ao adicionar o filme. Verifique os dados e tente novamente.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Adicionar Filme
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
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Diretor"
              name="director"
              value={formData.director}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="genre-label">Gênero</InputLabel>
              <Select
                labelId="genre-label"
                name="genre"
                value={formData.genre}
                onChange={handleSelectChange}
                fullWidth
                required
              >
                {Object.values(MovieGenre).map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Adicionar Filme
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddMoviePage;