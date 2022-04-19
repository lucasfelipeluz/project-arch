import express from 'express'
import mongoose from 'mongoose'

import { routerSaldo } from './routes/saldo.routes'
import { routerTransacao } from './routes/transacao.routes'

require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routerSaldo)
app.use('/', routerTransacao)

const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_PORT, DB_DATABASE, DB_URL_HOSTNAME } = process.env

mongoose.connect(
  `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`
)
  .catch((error:Error) => { console.log(`Erro ao conectar ao MongoDB!\n${error.message}`) })

const port = process.env.SERVER_PORT || 8080
app.listen(port, (): void => {
  console.log(`Servidor iniciado! http://localhost:${port}`)
})

export { app }
