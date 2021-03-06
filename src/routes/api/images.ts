import { Router as router, Request, Response } from 'express'
import fs, { promises as fsPromises } from 'fs'
import { processImage } from '../../utilities'

const images = router()

images.get('/', (req: Request, res: Response): void => {
  // Extract query parameters
  const queryFilename = req.query.filename
  let filename = queryFilename
  // trim extension, if exists
  if (typeof queryFilename === 'string') {
    const index =  queryFilename.indexOf('.')
    if (index >= 0) { 
      filename = queryFilename.substring(0, queryFilename.indexOf('.'))
    }
  }
  const width: number = parseInt(req.query.width as string)
  const height: number = parseInt(req.query.height as string)

  // Paths for source file and resized file
  const filepath = `./images/${filename}.jpg`
  const outpath = `./resized/${filename}_${width}x${height}.jpg`

  // If either width or height is not specified, display error message.
  if (Number.isNaN(width) || Number.isNaN(height)) {
    res
      .status(400)
      .end('Error: Width or height parameters not specified correctly.')
    return
  }

  // Check if resized image already exists, and handle cases.
  fsPromises
    .access(outpath, fs.constants.R_OK)
    // If resized image already exists in output folder, return cached instead.
    .then(() => {
      res.status(200).sendFile(outpath, { root: __dirname + '../../../../' })
    })
    // Otherwise, access image in /images, resize accordingly, and store in /resized folder.
    .catch(() => {
      fsPromises
        .access(filepath, fs.constants.R_OK)
        .then(async () => {
          const file = await fsPromises.readFile(filepath)
          const processed = await processImage(file, outpath, width, height)
          if (processed) {
            res
              .status(200)
              .sendFile(outpath, { root: __dirname + '../../../../' })
          }
        })
        .catch(() =>
          res
            .status(400)
            .end('Cannot read specified file! Please ensure image exists.')
        )
    })
})

export default images
