import Joi from 'joi';
import { MovieGenre } from '../../entity/enum/MovieGenre.enum';

export const createMovieSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    director: Joi.string().required(),
    genre: Joi.string().valid(...Object.values(MovieGenre)).required(),
  }),
};
