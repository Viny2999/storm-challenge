
import { dataSource } from '../config/dataSource';
import { Movie } from '../entity/Movie';
import { Rating } from '../entity/Rating';

export class MovieRepository {
  private movieRepository = dataSource.getRepository(Movie);
  private ratingRepository = dataSource.getRepository(Rating);

  async view(id: number): Promise<Movie> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async create(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(this.movieRepository.create(movie));
  }

  async update(id: number, movie: Partial<Movie>): Promise<Movie> {
    await this.movieRepository.update(id, movie);
    return this.view(id);
  }

  async addVote(id: number, rating: Rating): Promise<Rating> {
    const newRating = this.ratingRepository.create({
      movie_id: id,
      user_id: rating.user_id,
      rating: rating.rating,
    });

    return this.ratingRepository.save(newRating);
  }
}
