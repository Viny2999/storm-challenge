import Joi from 'joi';

export const getMovieSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
