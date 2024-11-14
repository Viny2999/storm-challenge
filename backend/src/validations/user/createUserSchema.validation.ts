import Joi from 'joi';
import { UserRole } from '../../entity/enum/UserRole.enum';

export const createUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(...Object.values(UserRole)).default(UserRole.USER),
  }),
};
