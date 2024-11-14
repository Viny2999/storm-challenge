import Joi from 'joi';

export const addVoteSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    rating: Joi.number().min(0).max(4).required(),
  }),
};
