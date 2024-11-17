import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';  // Assuming you have redis client set up

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Check if the token is blacklisted in Redis
    const isBlacklisted = await redisClient.get(`blacklist_${token}`);
    if (isBlacklisted) {
      return res.status(401).send('Token has been invalidated. Please log in again.');
    }

    // Verify the token if it is not blacklisted
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Add decoded user info to request
    next();
  } catch (error) {
    return res.status(400).send('Invalid token.');
  }
};

export default verifyToken;
