import axios from 'axios';
import { API_URL } from '../config/enviroment';
import { Movie, MovieData } from '../interfaces/Movie';
import { UserData } from '../interfaces/User';
import { LoginResponse } from '../interfaces/Login';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.Authorization;
  }
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post('/v1/login', {
    email,
    password,
  });
  return response.data;
};

export const listMovies = async (): Promise<Movie[]> => {
  const response = await apiClient.get('/v1/movie');
  return response.data;
};

export const createMovie = async (movieData: MovieData) => {
  const response = await apiClient.post('/v1/movie', movieData);
  return response.data;
};

export const createUser = async (userData: UserData) => {
  const response =  await apiClient.post('/v1/user', userData);
  return response.data;
};

