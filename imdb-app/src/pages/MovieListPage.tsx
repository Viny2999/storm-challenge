import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/enviroment';
console.log('API_URL:', API_URL)

interface Movie {
  id: number;
  name: string;
  description: string;
  director: string;
  genre: string;
}

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
        const response = await axios.get(`${API_URL}/v1/movie`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data);
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
