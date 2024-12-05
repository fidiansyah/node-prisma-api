  import express from 'express'; 
  import helmet from 'helmet';
  import authRoutes from './routes/authRoutes.js';
  import userRoutes from './routes/userRoutes.js';
  import logger from './utils/logger.js'; 

  const app = express(); 

  // Middleware
  app.use(helmet()); // Keamanan header HTTP
  app.use(express.json()); 

  // Middleware for logging
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`); 
    next();
  });

  // Routes
  app.use('/api', authRoutes);
  app.use('/api', userRoutes);

  // 404 Error Handling
  app.use((req, res, next) => {
    res.status(404).json({ 
      status: 'error',
      message: 'Resource not found.'
    });
  });

  // General Error Handling
  app.use((err, req, res, next) => {
    logger.error(err.stack); // Log error stack
    res.status(500).json({ 
      status: 'error', 
      message: 'Something went wrong!' 
    });
  });

  // Start the server
  const PORT = process.env.PORT;
  const BASE_URL = process.env.BASE_URL;
  app.listen(PORT, () => {
    logger.info(`Server is running on ${BASE_URL}:${PORT}`);
  });
