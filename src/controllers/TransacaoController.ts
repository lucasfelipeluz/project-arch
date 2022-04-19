import { Request, response, Response } from 'express'

import Responses from '@utils/Responses'
import Transacao from '@models/TransacaoModel'
import { getRedis, setRedis } from '@config/redisConfig'

class TransacaoController {
  async create (request: Request, response: Response): Promise<Responses> {
    const { idContaCorrente, valorTransacao, debito, credito } = request.body

    if (idContaCorrente === undefined || valorTransacao === undefined || debito === undefined || credito === undefined) {
      return Responses.badRequest(response, [], {}, 'Certifique-se de que todas as informações estão sendo passadas!')
    }
    if (idContaCorrente === '' || valorTransacao === '' || debito === '' || credito === '') {
      return Responses.badRequest(response, [], {}, 'Certifique-se de que todas as informações estão preenchidas!')
    }
    if (credito === debito || debito === credito) {
      return Responses.badRequest(response, [], {}, 'A transacão tem que ser débito ou crédio e não as duas ao mesmo')
    }

    try {
      const responseGetValorTransacao = await Transacao.GetValorTransacaoByIdContaCorrente(idContaCorrente)
      if (responseGetValorTransacao.status === false) {
        throw new Error('Erro interno ao conectar com banco de dados!')
      }

      let saldoContaCorrente
      if (responseGetValorTransacao.status === null) {
        saldoContaCorrente = 0
      }

      if (responseGetValorTransacao.status === true) {
        saldoContaCorrente = 0
        const valores: any = Object.values(responseGetValorTransacao.data)
        for (let index = 0; index < valores.length; index++) {
          saldoContaCorrente += parseFloat(valores[index].valorTransacao)
        }
      }
      saldoContaCorrente += valorTransacao

      if (await setRedis(idContaCorrente, saldoContaCorrente) !== 'OK') {
        throw new Error('Erro interno ao conectar com memória cache!')
      }

      const { status } = await Transacao.Add(idContaCorrente, valorTransacao, debito, credito)
      if (!status) {
        throw new Error('Erro interno ao conectar com banco de dados!')
      }

      return Responses.created(response)
    } catch (error) {
      console.log(error)
      return Responses.internalServerError(response, [], {}, error.message)
    }
  }
}

export default new TransacaoController()
