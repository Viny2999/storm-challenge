import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './enum/UserRole.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  status: boolean;

  @Column({
    type: 'enum',
    enum: [UserRole.ADMIN, UserRole.USER],
    default: UserRole.USER,
  })
  role: UserRole;
}