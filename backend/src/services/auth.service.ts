import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserRepository } from '../repositories/user.repository';
import { Request, Response } from 'express';
import { User } from '../entity/User';
dotenv.config();

const userRepository = new UserRepository();

export class AuthService {
  private saltRounds: number = Number(process.env.SALT_ROUNDS);

  public hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  public comparePassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
  }

  public generateToken = (user: User): string => {
    const bodyToken = {
      id: user.id,
      role: user.role,
    }

    return jwt.sign(bodyToken, process.env.JWT_SECRET);
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await userRepository.viewByEmail(email);

    const isLogged = this.comparePassword(password, user.password);

    if (!isLogged) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const token = this.generateToken(user);

    return res.status(200).send({ token, role: user.role });
  }
}
