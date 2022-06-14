import fs, { promises as fsPromises } from 'fs'
import { FileHandle } from 'fs/promises'
import sharp, { OutputInfo } from 'sharp'

// Resize image based on given with and height
// if error encountered, return -1.
const processImage = async (file: Buffer, outpath: string, width: number, height: number): Promise<number> => {
    return await sharp(file).resize(width, height)
    .toFile(outpath)
    .then(() => 0)
    .catch(err => {
        console.log(`Error during resizing: ${err}`)
        return -1;
    })

}

export {
    processImage,
}
