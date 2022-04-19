/* Pré-sets de respostas de servidor que são mais usadas */
export default class Responses {
  /* Respostas de sucesso */
  /* 200 - 226 */
  static success (res, data:Array<any> = [], info: Object = {}): Responses {
    res.status(200)
    return res.json({
      success: true,
      data,
      info
    })
  }

  static created (res, data: Array<any> = [], info: Object = {}): Responses {
    res.status(201)
    return res.json({
      success: true,
      data,
      info
    })
  }

  static noContent (res): Responses {
    res.status(204)
    return res.json({
      success: true
    })
  }

  /* Respostas de erro do cliente */
  /* 400 - 451 */
  static badRequest (res, data: Array<any> = [], info: Object = {}, msgError = 'Requisição mal feita!'): Responses {
    res.status(400)
    return res.json({
      success: false,
      msgError,
      data,
      info
    })
  }

  static unauthenticated (res, data: Array<any> = [], info: Object = {}, msgError = 'Credenciais inválidas!'): Responses {
    res.status(401)
    return res.json({
      success: false,
      msgError,
      data,
      info
    })
  }

  static forbidden (res, data: Array<any> = [], info: Object = {}, msgError = 'Você não tem permissão para acessar a rota desejada!'): Responses {
    res.status(403)
    return res.json({
      success: false,
      msgError,
      data,
      info
    })
  }

  static notFound (res, data: Array<any> = [], info: Object = {}, msgError = 'Rota não encontrada!'): Responses {
    res.status(404)
    return res.json({
      success: false,
      msgError,
      data,
      info
    })
  }

  static methodNotAllowed (res, data: Array<any> = [], info: Object = {}, msgError = 'Rota indisponível momentaneamente!'): Responses {
    res.status(405)
    return res.json({
      success: false,
      msgError,
      data,
      info
    })
  }

  static notAcceptable (res, data: Array<any> = [], info: Object = {}, msgError = 'Credenciais enviadas não são válidas para acessar a rota!'): Responses {
    res.status(406)
    return res.json({
      success: false,
      msgError,
      data,
      info
    })
  }

  /* Respostas de erro do servidor */
  /* 500 - 511 */
  static internalServerError (res, data: Array<any> = [], info: Object = {}, msgError = 'Erro no servidor!'): Responses {
    res.status(500)
    return res.json({
      success: null,
      msgError,
      data,
      info
    })
  }

  static notImplemented (res, data: Array<any> = [], info: Object = {}, msgError = 'Rota ainda não foi implementada!'): Responses {
    res.status(501)
    return res.json({
      success: null,
      msgError,
      data,
      info
    })
  }

  static serviceUnavailable (res, data: Array<any> = [], info: Object = {}, msgError = 'Servidor está sobrecarregado ou em manuntenção!'): Responses {
    res.status(503)
    return res.json({
      success: null,
      msgError,
      data,
      info
    })
  }
}
