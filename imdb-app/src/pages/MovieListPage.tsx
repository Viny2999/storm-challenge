import React, { useEffect, useState } from 'react';
import { Movie } from '../interfaces/Movie';
import { listMovies, setAuthToken } from '../service/http.service';

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
        const movies = await listMovies()
        setMovies(movies);
      } catch (err) {
        setError('Failed to fetch movies.');
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie.name} - {movie.director} - {movie.genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieListPage;
