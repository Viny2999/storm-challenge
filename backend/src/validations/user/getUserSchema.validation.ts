import Joi from 'joi';

export const getUserSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
