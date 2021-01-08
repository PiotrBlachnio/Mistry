import { Router } from 'express';
import { Constants } from '../../common/constants';
import { BooksController } from './books.controller';

const router = Router();
const controller = new BooksController();

router.get(Constants.ENDPOINT.BOOK.GET, controller.get);

export default router;