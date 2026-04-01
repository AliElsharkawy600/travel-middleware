import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

import { APP_CONSTANTS } from './constants/app.const';

const app = express();
const PORT = APP_CONSTANTS.PORT;

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

app.use(cors());
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Travel Middleware API',
    documentation: 'http://localhost:3000/api-docs',
    endpoints: {
      hotels: 'http://localhost:3000/hotels'
    }
  });
});

// API Routes
app.use('/', routes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Travel Middleware Service running on http://localhost:${PORT}`);
});

export default app;
