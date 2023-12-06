import { createClient } from 'redis'

const config = require('config')

const redis = config.get('redisDevURI')

const client = createClient({
  url: redis,
})

export default client
