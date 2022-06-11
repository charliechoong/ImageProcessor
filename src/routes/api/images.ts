import express from "express";
import fs, { promises as fsPromises } from "fs";
import sharp, { OutputInfo } from 'sharp';

const images = express.Router();

images.get("/", (req: express.Request, res: express.Response): void => {
  const filename = req.query.filename;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);
  const filepath = `./images/${filename}`;
  const outpath = `./resized/${filename}`;
  fsPromises.access(filepath, fs.constants.R_OK)
    .then(async () => {
        const file = await fsPromises.readFile(filepath);
        sharp(file).resize(width, height).toFile(outpath, (err: Error, info: OutputInfo) => {
            if (err) {
                console.log(`Error: ${err}`);
                return;
            }
            res.status(200).send(`<strong>${filename}</strong> image successfully resized`);
        })
    })
    .catch(() => res.status(200).end("Cannot read specified file! Please ensure image exists."));
});

export default images;