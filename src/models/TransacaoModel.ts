import mongoose, { Schema, Model } from 'mongoose'

const TransacaoModel:Schema = new Schema({
  idContaCorrente: Number,
  valorTransacao: Number,
  data: Date,
  debito: Boolean,
  credito: Boolean
})

export class Transacao {
  private Transacao: Model<Schema>
  constructor (private schema: Schema) {
    this.Transacao = mongoose.model('Transacoes', schema)
  }

  async Add (idContaCorrente, valorTransacao, debito, credito): Promise<any> {
    try {
      this.Transacao.create(
        { idContaCorrente, valorTransacao, debito, credito },
        (error) => {
          if (error) { throw new Error('Erro interno!') }
        })
      return { status: true }
    } catch (error) {
      console.log(error)
      return { status: false }
    }
  }

  async GetValorTransacaoByIdContaCorrente (idContaCorrente: Number): Promise<any> {
    try {
      const data: any[] = await this.Transacao
        .find({ idContaCorrente })
        .select('valorTransacao')
        .exec()

      if (Object.values(data).length < 1) {
        return { status: null }
      }
      return { status: true, data }
    } catch (error) {
      console.log(error)
      return { status: false }
    }
  }
}

export default new Transacao(TransacaoModel)
