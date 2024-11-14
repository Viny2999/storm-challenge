
import { injectable } from 'tsyringe';
import { dataSource } from '../config/dataSource';
import { User } from '../entity/User';

@injectable()
export class UserRepository {
  private userRepository = dataSource.getRepository(User);

  async view(id: number): Promise<User|null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async viewByEmail(email: string): Promise<User|null>  {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(this.userRepository.create(user));
  }

  async update(id: number, user: Partial<User>): Promise<User|null>  {
    delete user.role;
    await this.userRepository.update(id, user);
    return this.view(id);
  }

  async delete(id: number): Promise<User|null>  {
    await this.userRepository.update(id, {
      status: false,
    });
    return this.view(id);
  }
}
