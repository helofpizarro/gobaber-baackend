import {RedisOptions} from 'ioredis'

interface ICacheProvider {
  driver: 'redis',

  config: {
    redis: RedisOptions
  }
}


export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    }
  },
} as ICacheProvider