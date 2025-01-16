import { createClient, RedisClientType } from 'redis';

class RedisClient {
  client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL
    });

    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.client.on('error', (err) => {
      console.error('Redis error', err);
    });

    this.connect();
  }

  async connect() {
    await this.client.connect();
  }

  getClient() {
    return this.client;
  }
}

const redisClient = new RedisClient();
Object.freeze(redisClient);

export default redisClient;
