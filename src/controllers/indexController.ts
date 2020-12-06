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
            aisDecoder.on('error', e => { });
            aisDecoder.on('data', (decodedMessage) => {
                msg = decodedMessage;
            });
            aisDecoder.write(secuence);
            const deco = JSON.parse(msg);
            const lat = parseFloat(deco.lat).toFixed(6);
            const lon = parseFloat(deco.lon).toFixed(6);

            const info: Secuence = new NMEA({
                secuence,
                lat,
                lon
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
        const aux = secuences.reverse();
        let last: Secuence[] = [
            new NMEA({
                secuence: "",
                lat: 40,
                lon: -8
            })
        ];
        if (aux.length > 0) {
            last = [
                aux[0]
            ]
        }

        res.render('index', {
            title: 'Home',
            last,
            zoom: aux.length > 0 ? 11 : 1.5,
            empty: aux.length > 0 ? true : false
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
            secuences,
            zoom: 2
        });
    }

    public async view(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const task = [
            await NMEA.findOne({ _id: id })
        ];
        res.render('view', {
            title: 'View',
            task,
            zoom: 11
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