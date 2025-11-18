// src/redis/redis.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.redis.on('connect', () => {
      this.logger.log('✅ Redis connected successfully!');
    });

    this.redis.on('error', (err) => {
      this.logger.error('❌ Redis connection error:', err);
    });
  }

  async set(key: string, value: any, ttlSeconds?: number) {
    if (ttlSeconds) {
      await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } else {
      await this.redis.set(key, JSON.stringify(value));
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async del(key: string) {
    await this.redis.del(key);
  }

  getClient(): Redis {
    return this.redis;
  }

  /**
   * Function get multiple keys from Redis
   */
  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    if (!keys.length) return [];
    const results = await this.redis.mget(...keys); // trả về (string|null)[]
    return results.map(item => (item ? JSON.parse(item) as T : null));
  }

  pipeline() {
    return this.redis.pipeline();
  }
}
