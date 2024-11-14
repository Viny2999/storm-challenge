import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetail } from '../interfaces/Movie';
import { getMovieById, setAuthToken } from '../service/http.service';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string>('');

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

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movie ? (
        <div>
          <h2>{movie.name}</h2>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Rating Average:</strong> {movie.rating}</p>
          <p><strong>Description:</strong> {movie.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailPage;
