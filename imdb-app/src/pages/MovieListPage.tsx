import React, { useEffect, useState } from 'react';
import { Movie } from '../interfaces/Movie';
import { Link } from 'react-router-dom';
import { listMovies, setAuthToken } from '../service/http.service';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Alert } from '@mui/material';

const MovieListPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        setAuthToken(token);
        const movies = await listMovies();
        setMovies(movies);
      } catch (err) {
        setError('Failed to fetch movies.');
      }
    };

    fetchMovies();
  }, []);

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
