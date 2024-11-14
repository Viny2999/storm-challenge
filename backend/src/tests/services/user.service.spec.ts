import 'reflect-metadata'

import { Request, Response } from 'express';
import { JwtPayload } from '../../interfaces/JwtPayload.interface';
import { UserService } from '../../services/user.service';
import { UserRepository } from '../../repositories/user.repository';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entity/User';
import { UserRole } from '../../entity/enum/UserRole.enum';


jest.mock('../../repositories/user.repository');
jest.mock('../../services/auth.service');

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockRequest = (userPayload: JwtPayload, body = {}, params = {}) => {
  const req = {
    body,
    params,
    user: userPayload,
  };
  return req as unknown as Request;
};

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;
  let authService: jest.Mocked<AuthService>;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService(userRepository) as jest.Mocked<AuthService>;
    userService = new UserService(userRepository, authService);
  });

  describe('myUser', () => {
    it('should return user data if found', async () => {
      const userPayload: JwtPayload = { id: 1, role: UserRole.USER };
      const req = mockRequest(userPayload);
      const res = mockResponse();
      const user = { id: 1, name: 'John Doe', password: 'hashedPassword' } as User;

      userRepository.view.mockResolvedValue(user);

      await userService.myUser(req, res);

      expect(userRepository.view).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
    });

    it('should return 404 if user is not found', async () => {
      const userPayload: JwtPayload = { id: 1, role: UserRole.USER };
      const req = mockRequest(userPayload);
      const res = mockResponse();

      userRepository.view.mockResolvedValue(null);

      await userService.myUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('view', () => {
    it('should return user data if found by ID', async () => {
      const req = mockRequest({ id: 1, role: UserRole.USER }, {}, { id: '1' });
      const res = mockResponse();
      const user = { id: 1, name: 'Jane Doe', password: 'hashedPassword' } as User;

      userRepository.view.mockResolvedValue(user);

      await userService.view(req, res);

      expect(userRepository.view).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith({ id: 1, name: 'Jane Doe' });
    });

    it('should return 404 if user is not found by ID', async () => {
      const req = mockRequest({ id: 1, role: UserRole.USER }, {}, { id: '1' });
      const res = mockResponse();

      userRepository.view.mockResolvedValue(null);

      await userService.view(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user data', async () => {
      const userPayload: JwtPayload = { id: 1, role: UserRole.USER };
      const req = mockRequest(userPayload, { name: 'Updated User' });
      const res = mockResponse();
      const updatedUser = { id: 1, name: 'Updated User' } as User;

      userRepository.update.mockResolvedValue(updatedUser);

      await userService.update(req, res);

      expect(userRepository.update).toHaveBeenCalledWith(1, { name: 'Updated User' });
      expect(res.send).toHaveBeenCalledWith(updatedUser);
    });

    it('should return 404 if user is not found during update', async () => {
      const userPayload: JwtPayload = { id: 1, role: UserRole.USER };
      const req = mockRequest(userPayload, { name: 'Updated User' });
      const res = mockResponse();

      userRepository.update.mockResolvedValue(null);

      await userService.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('delete', () => {
    it('should delete a user and return the deleted user data', async () => {
      const userPayload: JwtPayload = { id: 1, role: UserRole.USER };
      const req = mockRequest(userPayload);
      const res = mockResponse();
      const deletedUser = { id: 1, name: 'Deleted User' } as User;

      userRepository.delete.mockResolvedValue(deletedUser);

      await userService.delete(req, res);

      expect(userRepository.delete).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(deletedUser);
    });

    it('should return 404 if user is not found during delete', async () => {
      const userPayload: JwtPayload = { id: 1, role: UserRole.USER };
      const req = mockRequest(userPayload);
      const res = mockResponse();

      userRepository.delete.mockResolvedValue(null);

      await userService.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
});
