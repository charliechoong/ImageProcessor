import express from 'express'
import routes from './routes'

const app = express()
const port = 3001

app.listen(port, () => console.log(`Server running on port ${port}`))

app.use('/', routes)

export default app
