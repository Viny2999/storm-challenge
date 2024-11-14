import { Router } from 'express';
import { UserService } from '../../services/user.service';
import { UserRole } from '../../entity/enum/UserRole.enum';
import validateRole from '../../middlewares/validateRole';
import { JoiValidate } from '../../middlewares/validate';
import { createUserSchema, getUserSchema, updateUserSchema } from '../../validations';

const router = Router();
const userService = new UserService();

router.get('/view/my', validateRole([UserRole.ADMIN, UserRole.USER]), userService.myUser);
router.get('/:id', JoiValidate(getUserSchema), validateRole([UserRole.ADMIN]), userService.view);
router.post('/', JoiValidate(createUserSchema), validateRole([UserRole.ADMIN]), userService.create);
router.put('/', JoiValidate(updateUserSchema), validateRole([UserRole.ADMIN, UserRole.USER]), userService.update);
router.delete('/', validateRole([UserRole.ADMIN, UserRole.USER]), userService.delete);

export const UserController: Router = router;
