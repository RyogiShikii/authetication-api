import 'dotenv/config'

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

// import routers
import router from './src/routes/users.js'

// create an express app and use JSON
const app = new express()
app.use(express.json())

// error handlers
app.use((err, req, res, next) => {

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message:  'Invalid JSON payload passed.' })
  }

  if (err) return res.status(400).send({ message: err.message })

  return next();
})

// bring in some routers
app.use('/user', router)

// set up swagger in the root
const swaggerDocument = YAML.load('api.yaml')
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// start the server
app.listen(3000, () => console.log('Server is running!'))
