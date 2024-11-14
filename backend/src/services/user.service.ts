import { JwtPayload } from '../interfaces/JwtPayload.interface';
import { UserRepository } from '../repositories/user.repository';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(AuthService) private authService: AuthService,
  ) {}

  public myUser = async (req: Request, res: Response): Promise<Response> => {
    const userToken = req['user'] as JwtPayload;
    const user = await this.userRepository.view(userToken.id);

    if (!user) {
      return this.notFoundUser(res);
    }

    delete user.password;
    return res.send(user);
  }

  public view = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    const user = await this.userRepository.view(id);

    if (!user) {
      return this.notFoundUser(res);
    }

    delete user.password;
    return res.send(user);
  }
  
  public create = async (req: Request, res: Response): Promise<Response> => {
    const newUser = {
      ...req.body,
      password: this.authService.hashPassword(req.body.password),
    }
    const user = await this.userRepository.create(newUser);
    delete user.password;
    return res.status(201).send(user);
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    const userToken = req['user'] as JwtPayload;

    if (req.body.password) {
      req.body.password = this.authService.hashPassword(req.body.password);
    }

    const user = await this.userRepository.update(userToken.id, req.body);

    if (!user) {
      return this.notFoundUser(res);
    }

    return res.send(user);
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const userToken = req['user'] as JwtPayload;
    const user = await this.userRepository.delete(userToken.id);

    if (!user) {
      return this.notFoundUser(res);
    }

    return res.send(user);
  }

  private notFoundUser = (res: Response): Response => 
    res.status(404).send({ message: 'User not found' });
}
