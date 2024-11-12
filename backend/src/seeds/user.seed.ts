import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../entity/enum/UserRole.enum';

const authService = new AuthService();

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const user = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: await authService.hashPassword('admin'),
    role: UserRole.ADMIN,
  };

  const existingUser = await userRepository.findOneBy({ email: user.email });
  if (!existingUser) {
    await userRepository.save(userRepository.create(user));
  }
};
