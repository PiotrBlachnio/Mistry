import { Router } from 'express';
import { Constants } from '../../common/constants';
import { validateQuery } from '../../common/middlewares/validate-query.middleware';
import { BooksController } from './books.controller';
import { GetManyValidationSchema } from './schemas/get-many.schema';

const router = Router();
const controller = new BooksController();

router.get(Constants.ENDPOINT.BOOK.GET_MANY, validateQuery(GetManyValidationSchema), controller.getMany);

export default router;