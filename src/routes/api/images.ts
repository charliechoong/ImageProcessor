import express from 'express';

const images = express.Router();

images.get('/', (req: express.Request, res: express.Response): void => {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;

    res.status(200).send(`${filename} inputted. Params: ${req.params}`);
})

export default images;