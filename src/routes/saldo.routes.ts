import express, { Router } from 'express'

import SaldoController from '@controllers/SaldoController'

export const routerSaldo: Router = express.Router()

routerSaldo.get('/saldo/:idContaCorrente', SaldoController.index)
