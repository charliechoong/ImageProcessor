import { Router as router, Request, Response } from 'express'
import fs, { promises as fsPromises } from 'fs'
import sharp, { OutputInfo } from 'sharp'
import { processImage } from '../../utilities'

const images = router()

images.get('/', (req: Request, res: Response): void => {
  // Extract query parameters
  const filename = req.query.filename
  const width: number = parseInt(req.query.width as string)
  const height: number = parseInt(req.query.height as string)

  // Paths for source file and resized file
  const filepath = `./images/${filename}`
  const outpath = `./resized/${filename}`

  // If either width or height is not specified, return image stored in resized.
  // If image does not exist, return error
  if (Number.isNaN(width) || Number.isNaN(height)) {
    fsPromises
      .access(outpath, fs.constants.R_OK)
      .then(() =>
        res.status(200).sendFile(outpath, { root: __dirname + '../../../../' })
      )
      .catch(() =>
        res
          .status(400)
          .end('Error: Please provide correct filename, width and height.')
      )
    return
  }

  // Access image in /images and resize accordingly
  fsPromises
    .access(filepath, fs.constants.R_OK)
    .then(async () => {
      const file = await fsPromises.readFile(filepath);
      const result = await processImage(file, outpath, width, height);
      if (result === 0) {
        res.status(200).sendFile(outpath, { root: __dirname + '../../../../' });
      }
    })
    .catch(() =>
      res
        .status(400)
        .end('Cannot read specified file! Please ensure image exists.')
    )
})

export default images
