import { Router } from 'express';
import { Constants } from '../../common/constants';
import { validateQuery } from '../../common/middlewares/validate-query.middleware';
import { BooksController } from './books.controller';
import { GetBookValidationSchema } from './schemas/get.schema';

const router = Router();
const controller = new BooksController();

router.get(Constants.ENDPOINT.BOOK.GET, validateQuery(GetBookValidationSchema), controller.get);

export default router;