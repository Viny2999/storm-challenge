import { Router } from 'express';
import { MovieService } from '../../services/movie.service';
import { UserRole } from '../../entity/enum/UserRole.enum';
import validateRole from '../../middlewares/validateRole';
import { JoiValidate } from '../../middlewares/validate';
import { addVoteSchema, createMovieSchema, getMovieSchema } from '../../validations';

const router = Router();
const movieService = new MovieService();

router.get('/', validateRole([UserRole.ADMIN, UserRole.USER]), movieService.list);
router.get('/:id', JoiValidate(getMovieSchema), validateRole([UserRole.ADMIN, UserRole.USER]), movieService.view);
router.post('/', JoiValidate(createMovieSchema), validateRole([UserRole.ADMIN]), movieService.create);
router.post('/:id/vote', JoiValidate(addVoteSchema), validateRole([UserRole.USER]), movieService.addVote);

export const MovieController: Router = router;
