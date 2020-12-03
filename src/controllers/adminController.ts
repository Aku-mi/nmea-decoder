import { json, Request, Response } from 'express';

import ADMIN, { Admin } from '../models/admin';

class AdminController {

    public async index(req: Request, res: Response): Promise<void> {
        res.render('session', {
            title: 'Sign in'
        })
    }

    public async admin(req: Request, res: Response): Promise<void> {
        let k = false;
        const admin: Admin[] = await ADMIN.find();
        const { user, pass } = req.body;

        for (let i = 0; i < admin.length; i++) {
            if (admin[i].user == user && admin[i].pass == pass) {
                k = true;
            }
        }

        if (k) {
            res.redirect('/edit')
        } else {
            res.redirect('/session');
        }
    }

}

export const adminController = new AdminController();