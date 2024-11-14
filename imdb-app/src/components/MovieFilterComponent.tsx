import React, { useState } from 'react';
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, SelectChangeEvent, Box } from '@mui/material';
import { MovieFilter, MovieGenre } from '../interfaces/Movie';

interface MovieFilterProps {
  onFilter: (filter: MovieFilter) => void;
}

const MovieFilterComponent: React.FC<MovieFilterProps> = ({ onFilter }) => {
  const [filter, setFilter] = useState<MovieFilter>({
    name: '',
    director: '',
    genre: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<MovieGenre>) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value as MovieGenre,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filter);
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2,
          padding: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              label="Nome"
              name="name"
              value={filter.name}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Diretor"
              name="director"
              value={filter.director}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="genre-label">Gênero</InputLabel>
              <Select
                labelId="genre-label"
                name="genre"
                value={filter.genre || ''}
                onChange={handleSelectChange}
                label="Gênero"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.values(MovieGenre).map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MovieFilterComponent;
