import express from 'express';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
/**------------------------ */
import indexRoute from './routes/index';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import main from './config/database';

// Initialize database
main();

//Initialize express
const app = express();

//Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(morgan('dev'));

// CORS configuration
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));


//Routes
app.use('/', indexRoute);
app.use('/auth', authRoutes);
app.use('/api/posts', postRoutes);


// Middleware to handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error('Not Found');
    error.status = 404;
    next(error); // Pass the error to the next middleware
});
  
  // Error-handling middleware
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message || 'Internal Server Error',
      },
    });
});

export default app;