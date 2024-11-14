import React, { useState } from 'react';
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, SelectChangeEvent } from '@mui/material';
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
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              name="name"
              value={filter.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Diretor"
              name="director"
              value={filter.director}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="genre-label">Gênero</InputLabel>
              <Select
                labelId="genre-label"
                name="genre"
                value={filter.genre || ''}
                onChange={handleSelectChange}
                fullWidth
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MovieFilterComponent;