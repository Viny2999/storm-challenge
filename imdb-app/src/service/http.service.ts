import axios from 'axios';
import { API_URL } from '../config/enviroment';
import { Movie, MovieData, MovieDetail, MovieFilter } from '../interfaces/Movie';
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

const getParams = (filters: MovieFilter) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value.toString());
    }
  });
  return params.toString();
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post('/v1/login', {
    email,
    password,
  });
  return response.data;
};

export const listMovies = async (filters: MovieFilter): Promise<Movie[]> => {
  const params = getParams(filters);
  const url = `/v1/movie?${params}`;
  const response = await apiClient.get(url);
  return response.data;
};

export const getMovieById = async (id: string): Promise<MovieDetail> => {
  const response = await apiClient.get(`/v1/movie/${id}`);
  return response.data;
};

export const createMovie = async (movieData: MovieData) => {
  const response = await apiClient.post('/v1/movie', movieData);
  return response.data;
};

export const voteOnMovie = async (id: string, rating: number) => {
  const response = await apiClient.post(`/v1/movie/${id}/vote`, { rating });
  return response.data;
};


export const createUser = async (userData: UserData) => {
  const response =  await apiClient.post('/v1/user', userData);
  return response.data;
};

