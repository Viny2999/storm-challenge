import { inject, injectable } from 'tsyringe';
import { JwtPayload } from '../interfaces/JwtPayload.interface';
import { MovieRepository } from '../repositories/movie.repository';
import { Request, Response } from 'express';

@injectable()
export class MovieService {
  constructor(
    @inject(MovieRepository) private movieRepository: MovieRepository,
  ) {}

  public list = async (req: Request, res: Response): Promise<Response> => {
    const movies = await this.movieRepository.list(req.query);
    return res.send(movies);
  }
  
  public view = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    const movie = await this.movieRepository.view(id);

    if (!movie) {
      return res.status(404).send({ message: 'Movie not found' });
    }

    const ratingWithAverage ={
      ...movie,
      rating: await this.calculateRating(id),
    }

    return res.send(ratingWithAverage);
  }
  
  public create = async (req: Request, res: Response): Promise<Response> => {
    const movie = await this.movieRepository.create(req.body);
    return res.status(201).send(movie);
  }

  public addVote = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    const userToken = req['user'] as JwtPayload;
    
    try {
      const movie = await this.movieRepository.addVote(
        id,
        userToken.id,
        req.body.rating,
      );
      
      return res.send(movie);
    } catch (error) {
      if (error.message.includes('duplicate key')) {
        return res.status(400).send({ message: 'You have already voted for this movie' });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  public calculateRating = async (id: number): Promise<number> => {
    const ratings = await this.movieRepository.getRatings(id);
    const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / ratings.length;
  }
}
