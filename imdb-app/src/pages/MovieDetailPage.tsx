import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, setAuthToken, voteOnMovie } from '../service/http.service';
import { MovieDetail } from '../interfaces/Movie';
import { AxiosError } from 'axios';

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
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movie ? (
        <div>
          <h2>{movie.name}</h2>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Description:</strong> {movie.description}</p>
          {userRole === 'user' && (
            <div>
              <h3>Rate this movie (0-4)</h3>
              <input type="number" value={vote} onChange={handleVoteChange} min="0" max="4" />
              <button onClick={handleVoteSubmit}>Submit Vote</button>
              {message && <p>{message}</p>}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailPage;
