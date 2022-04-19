import express, { Router } from 'express'

import TransacaoController from '@controllers/TransacaoController'

export const routerTransacao: Router = express.Router()

routerTransacao.post('/transacao', TransacaoController.create)
