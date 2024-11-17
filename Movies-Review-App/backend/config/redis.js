import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379', // Replace with your Redis URL if remote
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.connect();

export default redisClient;