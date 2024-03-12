import { createClient } from 'redis';
import { REDIS_PW, REDIS_HOST } from './environment';

// Redis { user_id, socket_id }
class RedisDB {
  private static instance: RedisDB;
  private client: any;

  private constructor() {
    this.client = createClient({
      password: REDIS_PW,
      socket: {
        host: REDIS_HOST,
        port: 14836,
      },
    });

    this.client.connect();

    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.client.on('error', (err: any) => {
      console.error('Error connecting to Redis:', err);
    });
  }

  public static getInstance(): RedisDB {
    if (!RedisDB.instance) {
      RedisDB.instance = new RedisDB();
    }
    return RedisDB.instance;
  }

  public async set(key: string, value: string | null): Promise<void> {
    await this.client.set(key, value);
  }

  public async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    return value;
  }
}

export default RedisDB;

