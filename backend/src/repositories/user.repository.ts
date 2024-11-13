
import { dataSource } from '../config/dataSource';
import { User } from '../entity/User';

export class UserRepository {
  private userRepository = dataSource.getRepository(User);

  async view(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async viewByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(this.userRepository.create(user));
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    delete user.role;
    await this.userRepository.update(id, user);
    return this.view(id);
  }

  async delete(id: number): Promise<User> {
    await this.userRepository.update(id, {
      status: false,
    });
    return this.view(id);
  }
}
