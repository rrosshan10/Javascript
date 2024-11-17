import winston from 'winston';

// Create a winston logger instance with different log levels
const logger = winston.createLogger({
  level: 'info', // Set default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize the console logs
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/app.log' }) // Save logs to a file
  ]
});

// Export logger so it can be used in other parts of the application
export default logger;
