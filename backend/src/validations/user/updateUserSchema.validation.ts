import Joi from 'joi';

export const updateUserSchema = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};
