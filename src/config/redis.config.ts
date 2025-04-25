// src/config/redis.config.ts
import { createClient } from 'redis';

export const createRedisClient = () => {
  const client = createClient({
    url: process.env.REDIS_HOST || 'redis://localhost:6379',
  });
  
  client.on('error', (err) => {
    console.error('Redis client error:', err);
  });
  
  return client;
};
