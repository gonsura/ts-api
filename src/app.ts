import 'dotenv/config'
import {errorhandling, notFoundHandling} from   './util/errorhandling'
import note from './router/note';
import express, { Express } from 'express'
import morgan from 'morgan'

const app: Express = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/note', note)

app.use(notFoundHandling)

app.use(errorhandling)

export default app
