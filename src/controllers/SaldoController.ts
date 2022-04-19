import { Request, response, Response } from 'express'

import Responses from '@utils/Responses'
import Transacao from '@models/TransacaoModel'
import { getRedis, setRedis } from '@config/redisConfig'

class SaldoController {
  async index (request: Request, response: Response): Promise<Responses> {
    const { idContaCorrente } = request.params

    try {
      const responseCache = await getRedis(idContaCorrente)

      if (responseCache === null || responseCache === 'null') {
        const responseGetValorTransacao = await Transacao.GetValorTransacaoByIdContaCorrente(parseInt(idContaCorrente))
        if (responseGetValorTransacao.status === false) {
          throw new Error('Erro interno ao conectar com banco de dados!')
        }
        if (responseGetValorTransacao.status === null) {
          return Responses.badRequest(response, [], {}, 'Conta Corrente não encontrada!')
        }

        const valores: any = Object.values(responseGetValorTransacao.data)
        let saldoContaCorrente = 0
        for (let index = 0; index < valores.length; index++) {
          saldoContaCorrente += parseFloat(valores[index].valorTransacao)
        }

        if (await setRedis(idContaCorrente, saldoContaCorrente) !== 'OK') {
          throw new Error('Erro interno ao conectar com memória cache!')
        }

        const data = [
          { idContaCorrente: parseInt(idContaCorrente), saldo: parseFloat(await getRedis(idContaCorrente)) }
        ]

        return Responses.success(response, data)
      }

      const data = [{ idContaCorrente: parseInt(idContaCorrente), saldo: parseFloat(responseCache) }]
      return Responses.success(response, data)
    } catch (error) {
      return Responses.internalServerError(response, [], {}, error.message)
    }
  }
}

export default new SaldoController()
