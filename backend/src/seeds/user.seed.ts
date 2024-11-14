import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../entity/enum/UserRole.enum';
import { container } from 'tsyringe';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  const authService = container.resolve(AuthService);

  const user = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: authService.hashPassword('admin'),
    role: UserRole.ADMIN,
  };

  const existingUser = await userRepository.findOneBy({ email: user.email });
  if (!existingUser) {
    await userRepository.save(userRepository.create(user));
  }
};
