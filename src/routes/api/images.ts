import express from "express";
import fs, { promises as fsPromises } from "fs";
import sharp, { OutputInfo } from 'sharp';

const images = express.Router();

images.get("/", (req: express.Request, res: express.Response): void => {

  // Extract query parameters
  const filename = req.query.filename;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  // Paths for source file and resized file
  const filepath = `./images/${filename}`;
  const outpath = `./resized/${filename}`;

  // If either width or height is not specified, return image stored in resized.
  // If image does not exist, return error
  if (Number.isNaN(width) || Number.isNaN(height)) {
    fsPromises.access(outpath, fs.constants.R_OK)
      .then(async () => res.status(200).sendFile(outpath, { root: __dirname + "../../../../" }))
      .catch(() => res.status(400).end("Image does not exist. Please provide correct filename, width and height."));
    return;
  }

  // Access image in /images and resize accordingly
  fsPromises.access(filepath, fs.constants.R_OK)
    .then(async () => {
      const file = await fsPromises.readFile(filepath);
      sharp(file).resize(width, height).toFile(outpath, (err: Error, info: OutputInfo) => {
        if (err) {
          console.log(`Error: ${err}`);
          return;
          }
          res.status(200).sendFile(outpath, { root: __dirname + "../../../../" });
        })
    })
    .catch(() => res.status(400).end("Cannot read specified file! Please ensure image exists."));
});

export default images;