import { JwtPayload } from '../interfaces/JwtPayload.interface';
import { UserRepository } from '../repositories/user.repository';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const userRepository = new UserRepository();
const authService = new AuthService();

export class UserService {
  public myUser = async (req: Request, res: Response): Promise<Response> => {
    const userToken = req['user'] as JwtPayload;
    const user = await userRepository.view(userToken.userId);
    delete user.password;
    return res.send(user);
  }

  public view = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    const user = await userRepository.view(id);
    delete user.password;
    return res.send(user);
  }
  
  public create = async (req: Request, res: Response): Promise<Response> => {
    const newUser = {
      ...req.body,
      password: await authService.hashPassword(req.body.password),
    }
    const user = await userRepository.create(newUser);
    delete user.password;
    return res.status(201).send(user);
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    const userToken = req['user'] as JwtPayload;
    const user = await userRepository.update(userToken.userId, req.body);
    return res.send(user);
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const userToken = req['user'] as JwtPayload;
    const user = await userRepository.delete(userToken.userId);
    return res.send(user);
  }
}
