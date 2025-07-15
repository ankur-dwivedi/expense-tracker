import { Router, Request, Response } from 'express';
import userRouter from '../modules/user/router';
import expenseRouter from '../modules/expense/router';

const router = Router();

router.get('/', (_: Request, res: Response) => res.send());
router.use('/user', userRouter);
router.use('/expense', expenseRouter);

export default router;
