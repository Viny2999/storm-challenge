import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Movie } from './Movie';

@Entity({ name: 'ratings' })
@Unique(['user', 'movie'])
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Movie, movie => movie.id)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column()
  movie_id: number;

  @Column({ type: 'int', width: 1 })
  rating: number;

  @CreateDateColumn({ name: 'rating_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ratingDate: Date;
}