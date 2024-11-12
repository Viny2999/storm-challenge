import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

export class AuthService {
  private saltRounds: number = Number(process.env.SALT_ROUNDS);

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
