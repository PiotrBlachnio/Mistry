import { Router, Request, Response } from 'express';
import { Constants } from '../common/constants';

const router = Router();

router.use((req: Request, res: Response) => {
    res.status(Constants.STATUS_CODE.NOT_FOUND).send('Route not found. Check you URL and try again.');
});

export default router;