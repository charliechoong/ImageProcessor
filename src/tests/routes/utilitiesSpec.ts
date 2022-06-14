import { promises as fsPromises } from 'fs'
import { processImage } from '../../utilities'

describe('Test for image resizing', () => {
  let outputFilePath: string
  let validImageFile: Buffer

  beforeAll(async () => {
    const imageFilePath = './images/palmtunnel.jpg'
    outputFilePath = './resized/testPalmTunnel.jpg'
    await fsPromises
      .readFile(imageFilePath)
      .then((file) => (validImageFile = file))
      .catch((err) => console.log(err))
  })

  it('should return true', async () => {
    const result = await processImage(validImageFile, outputFilePath, 250, 150)
    expect(result).toBeTrue()
  })
})
