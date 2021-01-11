import { Router } from 'express';
import { Constants } from '../../common/constants';
import { validateQuery } from '../../common/middlewares/validate-query.middleware';
import { MovieController } from './movie.controller';
import { GetManyMoviesValidationSchema } from './schemes/get-many.schema';

const router = Router();
const controller = new MovieController();

router.get(Constants.ENDPOINT.MOVIE.GET_MANY, validateQuery(GetManyMoviesValidationSchema), controller.getMany);
router.get(Constants.ENDPOINT.MOVIE.GET_BY_ID, controller.getById);

export default router;