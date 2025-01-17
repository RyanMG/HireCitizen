import Redis from "ioredis";

if (!process.env.REDIS_URL) {
  throw new Error('Redis URL is not defined for the environment');
}

console.log('Redis URL', process.env.REDIS_URL);

class RedisClient {
  client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL!);

    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.client.on('error', (err) => {
      console.error('Redis client error', err);
    });
  }

  getClient() {
    return this.client;
  }
}

const redisClient = new RedisClient();
Object.freeze(redisClient);

export default redisClient;
