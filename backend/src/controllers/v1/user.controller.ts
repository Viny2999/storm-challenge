import { Router } from 'express';
import { UserService } from '../../services/user.service';
import { UserRole } from '../../entity/enum/UserRole.enum';
import validateRole from '../../middlewares/validateRole';

const router = Router();
const userService = new UserService();

router.get('/view/my', validateRole([UserRole.ADMIN, UserRole.USER]), userService.myUser);
router.get('/:id', validateRole([UserRole.ADMIN]), userService.view);
router.post('/', validateRole([UserRole.ADMIN]), userService.create);
router.put('/', validateRole([UserRole.ADMIN, UserRole.USER]), userService.update);
router.delete('/', validateRole([UserRole.ADMIN, UserRole.USER]), userService.delete);

export const UserController: Router = router;
