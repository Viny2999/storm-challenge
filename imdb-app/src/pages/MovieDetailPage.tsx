import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, setAuthToken, voteOnMovie } from '../service/http.service';
import { MovieDetail } from '../interfaces/Movie';
import { AxiosError } from 'axios';
import { Container, Typography, Card, CardContent, CardActions, Button, TextField, Alert } from '@mui/material';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string>('');
  const [vote, setVote] = useState<number | ''>('');
  const [message, setMessage] = useState<string>('');

  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchMovie = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        setAuthToken(token);
        const movie = await getMovieById(id!);
        setMovie(movie);
      } catch (err) {
        setError('Failed to fetch movie details.');
      }
    };

    fetchMovie();
  }, [id]);

  const handleVoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 4) {
      setVote(value);
      setMessage('');
    } else {
      setMessage('Please enter a rating between 0 and 4.');
    }
  };

  const handleVoteSubmit = async () => {
    if (vote === '') {
      setMessage('Please enter a valid rating.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('User not authenticated');
      }
      setAuthToken(token);

      await voteOnMovie(id!, vote);
      setMessage('Vote submitted successfully!');
    } catch (error) {
      if ((error as AxiosError).response?.status === 400) {
        setMessage('You have already voted for this movie.');
      } else {
        setMessage('Failed to submit vote. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="md">
      {error && <Alert severity="error" style={{ marginBottom: '16px' }}>{error}</Alert>}
      {movie ? (
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              {movie.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Director: {movie.director}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Genre: {movie.genre}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Rating: {movie.rating}
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.description}
            </Typography>
          </CardContent>
          {userRole === 'user' && (
            <CardActions>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Rate this movie (0-4)
                </Typography>
                <TextField
                  type="number"
                  value={vote}
                  onChange={handleVoteChange}
                  inputProps={{ min: 0, max: 4 }}
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: '16px' }}
                />
                <Button variant="contained" color="primary" onClick={handleVoteSubmit}>
                  Submit Vote
                </Button>
                {message && (
                  <Alert severity={message.includes('successfully') ? 'success' : 'error'} style={{ marginTop: '16px' }}>
                    {message}
                  </Alert>
                )}
              </div>
            </CardActions>
          )}
        </Card>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Container>
  );
};

export default MovieDetailPage;
