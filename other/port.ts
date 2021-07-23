import express from 'express';

import { App } from '../index';

export function listen() {
    App.listen(3000, (req: express.Request, res: express.Response) => {
        console.log('Started!');
    });
}