import { json, Request, Response } from 'express';

import AisDecoder from 'ais-stream-decoder';

import NMEA, { Secuence } from '../models/NMEA';

class IndexController {
    public async Decode(req: Request, res: Response): Promise<void> {
        const secuence = req.body.secuence;
        let k = false;
        try {
            let msg = "";
            const aisDecoder = new AisDecoder();
            aisDecoder.on('error', err => { });
            aisDecoder.on('data', (decodedMessage) => {
                msg = decodedMessage;
            });
            aisDecoder.write(secuence);
            const deco = JSON.parse(msg);
            const lat = parseFloat(deco.lat).toFixed(5);
            const lon = parseFloat(deco.lon).toFixed(5);
            const date = new Date();

            const info: Secuence = new NMEA({
                secuence,
                lat,
                lon,
                date
            });

            await info.save();
            k = true;
        } catch (error) {
            k = false;
        }

        if (k)
            res.redirect('/');
        else
            res.redirect('/invalid');

    }

    public async index(req: Request, res: Response): Promise<void> {
        const secuences: Secuence[] = await NMEA.find();
        const aux = secuences.reverse()[0];
        let last = {};
        if (aux)
            last = aux;

        res.render('index', {
            title: 'Home',
            last
        });
    }

    public about(req: Request, res: Response): void {
        res.render('about', {
            title: 'About'
        });
    }

    public invalid(req: Request, res: Response): void {
        res.render('invalid', {
            title: "Error"
        });
    }

    public async history(req: Request, res: Response): Promise<void> {
        const secuences: Secuence[] = await NMEA.find();
        const total = secuences.reverse();
        res.render('history', {
            title: "History",
            total
        });
    }

    public async general(req: Request, res: Response): Promise<void> {
        const secuences: Secuence[] = await NMEA.find();
        res.render('general', {
            title: 'General',
            secuences
        });
    }

    public async view(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const task = await NMEA.findOne({ _id: id });
        res.render('view', {
            title: 'View',
            task
        })
    }

    public async edit(req: Request, res: Response): Promise<void> {
        const tasks: Secuence[] = await NMEA.find();
        res.render('edit', {
            title: 'Admin',
            tasks
        });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await NMEA.findOneAndDelete({ _id: id });
        res.redirect('/edit');
    }

    public async deleteAll(req: Request, res: Response): Promise<void> {
        await NMEA.deleteMany({});
        res.redirect('/edit');
    }

}

export const indexController = new IndexController();