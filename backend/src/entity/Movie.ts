import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MovieGenre } from './enum/MovieGenre.enum';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  director: string;

  @Column({
    type: 'enum',
    enum: MovieGenre,
  })
  genre: MovieGenre;
}