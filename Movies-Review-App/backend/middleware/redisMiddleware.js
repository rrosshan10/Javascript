import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js'; // Import your Redis connection

const checkTokenBlacklist = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await redisClient.get(`blacklist_${token}`);

    if (isBlacklisted) {
      return res.status(401).send('Token has been invalidated (logged out).');
    }

    // If not blacklisted, verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user information in the request (optional)
    next();
  } catch (error) {
    console.error('Error checking token:', error);
    return res.status(400).send('Invalid token.');
  }
};

export default checkTokenBlacklist;
