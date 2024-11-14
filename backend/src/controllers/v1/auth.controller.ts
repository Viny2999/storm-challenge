import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthService } from '../../services/auth.service';
import { JoiValidate } from '../../middlewares/validate';
import { loginSchema } from '../../validations';

const router = Router();
const authService = container.resolve(AuthService);

router.post('/', JoiValidate(loginSchema), authService.login);

export const AuthController: Router = router;
