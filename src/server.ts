import app from './app'
import env from './util/validateEnv'
import mongoose from 'mongoose'

const port: number = env.PORT

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch(console.error)
