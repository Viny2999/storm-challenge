import 'reflect-metadata'

import { Request, Response } from 'express';
import { MovieService } from '../../services/movie.service';
import { MovieRepository } from '../../repositories/movie.repository';
import { JwtPayload } from '../../interfaces/JwtPayload.interface';

// Mock do Response
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

// Mock do Request
const mockRequest = (body = {}, params = {}, query = {}, user = {}) => {
  return {
    body,
    params,
    query,
    user,
  } as unknown as Request;
};

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    movieRepository = {
      list: jest.fn(),
      view: jest.fn(),
      create: jest.fn(),
      addVote: jest.fn(),
      getRatings: jest.fn(),
    } as unknown as jest.Mocked<MovieRepository>;

    movieService = new MovieService(movieRepository);
  });

  describe('list', () => {
    it('should return a list of movies', async () => {
      const req = mockRequest({}, {}, { genre: 'action' });
      const res = mockResponse();
      const movies = [{ id: 1, name: 'Movie 1' }];

      movieRepository.list.mockResolvedValue(movies as any);

      await movieService.list(req, res);

      expect(movieRepository.list).toHaveBeenCalledWith(req.query);
      expect(res.send).toHaveBeenCalledWith(movies);
    });
  });

  describe('view', () => {
    it('should return a movie with average rating if found', async () => {
      const req = mockRequest({}, { id: '1' });
      const res = mockResponse();
      const movie = { id: 1, name: 'Movie 1' };
      const ratings = [{ rating: 5 }, { rating: 3 }];

      movieRepository.view.mockResolvedValue(movie as any);
      movieRepository.getRatings.mockResolvedValue(ratings as any);

      await movieService.view(req, res);

      expect(movieRepository.view).toHaveBeenCalledWith(1);
      expect(movieRepository.getRatings).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith({ ...movie, rating: 4 });
    });

    it('should return 404 if movie is not found', async () => {
      const req = mockRequest({}, { id: '999' });
      const res = mockResponse();

      movieRepository.view.mockResolvedValue(null);

      await movieService.view(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Movie not found' });
    });
  });

  describe('create', () => {
    it('should create and return a movie', async () => {
      const req = mockRequest({ name: 'New Movie' });
      const res = mockResponse();
      const createdMovie = { id: 1, name: 'New Movie' };

      movieRepository.create.mockResolvedValue(createdMovie as any);

      await movieService.create(req, res);

      expect(movieRepository.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(createdMovie);
    });
  });

  describe('addVote', () => {
    it('should add a vote and return the updated movie', async () => {
      const req = mockRequest({ rating: 5 }, { id: '1' });
      req['user'] = { id: 123 } as JwtPayload;
      const res = mockResponse();
      const updatedMovie = { id: 1, name: 'Voted Movie' };

      movieRepository.addVote.mockResolvedValue(updatedMovie as any);

      await movieService.addVote(req, res);

      expect(movieRepository.addVote).toHaveBeenCalledWith(1, 123, 5);
      expect(res.send).toHaveBeenCalledWith(updatedMovie);
    });

    it('should return 400 if the user has already voted', async () => {
      const req = mockRequest({ rating: 5 }, { id: '1' });
      req['user'] = { id: 123 } as JwtPayload;
      const res = mockResponse();

      movieRepository.addVote.mockRejectedValue(new Error('duplicate key'));

      await movieService.addVote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'You have already voted for this movie' });
    });

    it('should return 500 for other errors', async () => {
      const req = mockRequest({ rating: 5 }, { id: '1' });
      req['user'] = { id: 123 } as JwtPayload;
      const res = mockResponse();

      movieRepository.addVote.mockRejectedValue(new Error('Unexpected error'));

      await movieService.addVote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Unexpected error' });
    });
  });

  describe('calculateRating', () => {
    it('should return the correct average rating', async () => {
      movieRepository.getRatings.mockResolvedValue([{ rating: 5 }, { rating: 3 }, { rating: 4 }] as any);

      const averageRating = await movieService.calculateRating(1);

      expect(movieRepository.getRatings).toHaveBeenCalledWith(1);
      expect(averageRating).toBe(4);
    });
  });
});
