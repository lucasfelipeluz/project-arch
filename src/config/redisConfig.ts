import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis({
  port: 6379,
  host: 'cacheData'
})

function getRedis (chave: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return syncRedisGet(chave)
}

function setRedis (valor: string, chave: any) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)
  return syncRedisSet(valor, chave, 'ex', 60)
}

export { redisClient, getRedis, setRedis }
