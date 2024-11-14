import { Router } from 'express';
import { MovieService } from '../../services/movie.service';
import { UserRole } from '../../entity/enum/UserRole.enum';
import validateRole from '../../middlewares/validateRole';

const router = Router();
const movieService = new MovieService();

router.get('/', validateRole([UserRole.ADMIN, UserRole.USER]), movieService.list);
router.get('/:id', validateRole([UserRole.ADMIN, UserRole.USER]), movieService.view);
router.post('/', validateRole([UserRole.ADMIN]), movieService.create);
router.post('/:id/vote', validateRole([UserRole.USER]), movieService.addVote);

export const MovieController: Router = router;
