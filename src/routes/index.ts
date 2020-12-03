import { Router, Request } from 'express';

const router: Router = Router();

import { indexController } from '../controllers/indexController';

router.get('/', indexController.index);

router.get('/about', indexController.about);

router.get('/invalid', indexController.invalid);

router.get('/history', indexController.history);

router.get('/general', indexController.general);

router.get('/view/:id', indexController.view);

router.post('/add', indexController.Decode);

export default router;