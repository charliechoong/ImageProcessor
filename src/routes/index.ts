import { Router as router } from 'express'
import images from './api/images'

const routes = router()

routes.get('/', (req, res) => {
  res.send('Welcome to Image Processing API.')
})

routes.use('/images', images)

export default routes
