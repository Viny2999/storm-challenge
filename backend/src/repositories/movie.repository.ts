
import { Like } from 'typeorm';
import { dataSource } from '../config/dataSource';
import { Movie } from '../entity/Movie';
import { Rating } from '../entity/Rating';
import { MovieFilter } from '../interfaces/MovieFilter.interface';

export class MovieRepository {
  private movieRepository = dataSource.getRepository(Movie);
  private ratingRepository = dataSource.getRepository(Rating);

  private makeFilter(filter: MovieFilter) {
    const { name, director, genre } = filter;
    const where: any = {};

    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (director) {
      where.director = Like(`%${director}%`);
    }

    if (genre) {
      where.genre = genre;
    }

    return where;
    }

  async list(filter: MovieFilter): Promise<Movie[]> {
    const where = this.makeFilter(filter);
    return this.movieRepository.find({ where });
  }
  
  async view(id: number): Promise<Movie|null> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async create(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(this.movieRepository.create(movie));
  }

  async addVote(id: number, userId: number, rating: number): Promise<Rating> {
    const newRating = this.ratingRepository.create({
      movie_id: id,
      user_id: userId,
      rating,
    });

    return this.ratingRepository.save(newRating);
  }

  async getRatings(id: number): Promise<Rating[]> {
    return this.ratingRepository.find({ where: { movie_id: id } });
  }
}
