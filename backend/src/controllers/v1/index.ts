import { Router } from 'express';
import { AuthController } from './auth.controller';
import { HealthCheckController } from './health-check.controller';
import { MovieController } from './movie.controller';
import { UserController } from './user.controller';
import { SwaggerController } from './swagger.controller';

const router = Router();

const defaultRoutes = [
  {
    path: '/health',
    route: HealthCheckController,
  },
  {
    path: '/docs',
    route: SwaggerController,
  },
  {
    path: '/login',
    route: AuthController,
  },
  {
    path: '/user',
    route: UserController,
  },
  {
    path: '/movie',
    route: MovieController,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const Routes: Router = router;
