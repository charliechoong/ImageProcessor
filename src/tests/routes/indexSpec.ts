import app from '../../'
import supertest from 'supertest'

const request = supertest(app)

describe('Test for root path', () => {
  it('should return status code 200', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })

  it('should return welcome message', async () => {
    const response = await request.get('/')
    expect(response.text).toBe('Welcome to Image Processing API.')
  })
})

describe('Test for /images endpoints', () => {
  describe('No width/height specified', () => {
    it('should return status code 400', async () => {
      const response = await request.get('/images?filename=fjord.jpg&width=200')
      expect(response.status).toBe(400)
    })
  })

  describe('Improper query parameters', () => {
    it('should return status code 400 due to invalid format', async () => {
      const response = await request.get('/images?fjord.jpg&width=200')
      expect(response.status).toBe(400)
    })

    it('should return status code 400 due to non-existent image', async () => {
      const response = await request.get('/images?filename=fjor.jpg&width=200')
      expect(response.status).toBe(400)
    })
  })
})
