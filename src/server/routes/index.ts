/* eslint-disable import/prefer-default-export */
import { Request, Response, Application } from 'express';
import ProductRouter from './ProductRouter';
import CategoryRouter from './CategoryRouter';

const setupRoutes = (app: Application): void => {
  app.use('/products', ProductRouter);
  app.use('/categories', CategoryRouter);

  app.get('/', (_: Request, res: Response) => {
    res.sendFile('public/index.html', { root: __dirname });
  });
};

export default setupRoutes;
