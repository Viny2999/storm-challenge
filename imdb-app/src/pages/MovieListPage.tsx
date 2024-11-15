import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { listMovies, setAuthToken } from '../service/http.service';
import { Movie, MovieFilter } from '../interfaces/Movie';
import MovieFilterComponent from '../components/MovieFilterComponent';

const MovieListPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<MovieFilter>({});

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        setAuthToken(token);
        const movies = await listMovies(filters);
        setMovies(movies);
      } catch (err) {
        setError('Failed to fetch movies.');
      }
    };

    fetchMovies();
  }, [filters]);

  const handleFilter = (filter: MovieFilter) => {
    setFilters(filter);
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Movies List
      </Typography>
      {error && (
        <Alert severity="error" style={{ marginBottom: '16px' }}>
          {error}
        </Alert>
      )}
      <MovieFilterComponent onFilter={handleFilter} />
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card>
              <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                  alt={movie.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Director: {movie.director}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {movie.genre}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieListPage;