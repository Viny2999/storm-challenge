import { Router } from 'express';
import { AuthService } from '../../services/auth.service';
import { JoiValidate } from '../../middlewares/validate';
import { loginSchema } from '../../validations';

const router = Router();
const authService = new AuthService();

router.post('/', JoiValidate(loginSchema), authService.login);

export const AuthController: Router = router;
