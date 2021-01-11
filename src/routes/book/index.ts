import { Router } from 'express';
import { Constants } from '../../common/constants';
import { validateQuery } from '../../common/middlewares/validate-query.middleware';
import { BookController } from './book.controller';
import { GetManyBooksValidationSchema } from './schemes/get-many.schema';

const router = Router();
const controller = new BookController();

router.get(Constants.ENDPOINT.BOOK.GET_MANY, validateQuery(GetManyBooksValidationSchema), controller.getMany);
router.get(Constants.ENDPOINT.BOOK.GET_BY_ID, controller.getById);

export default router;