import { Router } from 'express';
import { AuthService } from '../../services/auth.service';

const router = Router();
const authService = new AuthService();

router.post('/', authService.login);

export const AuthController: Router = router;
