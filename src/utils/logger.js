import winston from 'winston';
import { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json, prettyPrint } = format;

const dailyRotateTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(), 
    prettyPrint() 
  ),
  transports: [
    dailyRotateTransport, 
    new winston.transports.Console({
      format: format.combine(
        format.colorize(), 
        format.simple() 
      ),
    }),
  ],
});

export default logger;
