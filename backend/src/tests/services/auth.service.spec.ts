import 'reflect-metadata'

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AuthService } from '../../services/auth.service';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entity/User';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockRequest = (body = {}) => {
  return { body } as Request;
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      viewByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    authService = new AuthService(userRepository);
  });

  describe('hashPassword', () => {
    it('should hash the password correctly', () => {
      const password = 'plainPassword';
      (bcrypt.hashSync as jest.Mock).mockReturnValue('hashedPassword');

      const hashedPassword = authService.hashPassword(password);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(password, authService['saltRounds']);
      expect(hashedPassword).toBe('hashedPassword');
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching password and hash', () => {
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

      const result = authService.comparePassword('plainPassword', 'hashedPassword');

      expect(bcrypt.compareSync).toHaveBeenCalledWith('plainPassword', 'hashedPassword');
      expect(result).toBe(true);
    });

    it('should return false for non-matching password and hash', () => {
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

      const result = authService.comparePassword('wrongPassword', 'hashedPassword');

      expect(bcrypt.compareSync).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
      expect(result).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const user = { id: 1, role: 'user' } as User;
      (jwt.sign as jest.Mock).mockReturnValue('fakeToken');

      const token = authService.generateToken(user);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );
      expect(token).toBe('fakeToken');
    });
  });

  describe('login', () => {
    it('should return 401 if user is not found', async () => {
      const req = mockRequest({ email: 'test@example.com', password: 'password' });
      const res = mockResponse();

      userRepository.viewByEmail.mockResolvedValue(null);

      await authService.login(req, res);

      expect(userRepository.viewByEmail).toHaveBeenCalledWith('test@example.com');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

    it('should return 401 if password does not match', async () => {
      const req = mockRequest({ email: 'test@example.com', password: 'wrongPassword' });
      const res = mockResponse();
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' } as User;

      userRepository.viewByEmail.mockResolvedValue(user);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

      await authService.login(req, res);

      expect(bcrypt.compareSync).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

    it('should return 200 and a token if login is successful', async () => {
      const req = mockRequest({ email: 'test@example.com', password: 'password' });
      const res = mockResponse();
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword', role: 'user' } as User;

      userRepository.viewByEmail.mockResolvedValue(user);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('fakeToken');

      await authService.login(req, res);

      expect(userRepository.viewByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compareSync).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ token: 'fakeToken', role: 'user' });
    });
  });
});
