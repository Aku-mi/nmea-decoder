import { Router, Request } from 'express';

const router: Router = Router();

import { indexController } from '../controllers/indexController';

import { adminController } from '../controllers/adminController';

router.get('/', indexController.index);

router.get('/about', indexController.about);

router.get('/invalid', indexController.invalid);

router.get('/history', indexController.history);

router.get('/general', indexController.general);

router.get('/view/:id', indexController.view);

router.get('/session', adminController.index);

router.get('/edit', indexController.edit);

router.get('/delete/:id', indexController.delete);

router.get('/del/all', indexController.deleteAll);

router.post('/admin', adminController.admin);

router.post('/add', indexController.Decode);

export default router;