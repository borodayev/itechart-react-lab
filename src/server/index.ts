import express, { Application } from 'express';
import path from 'path';
import morgan from 'morgan';
import ProductRepository from './repositories/product';
import connectionDriver from './databaseConnection';
import logger from './config/logger';

const app: Application = express();

connectionDriver
  .connect()
  .then(() => {
    logger.info(`Connected to ${process.env.DB_TYPE} database.`);
    app.emit('ready');
  })
  .catch((e) => {
    logger.error(e);
  });

app.on('ready', () => {
  app.use(
    morgan('tiny', {
      stream: {
        write(message: string) {
          logger.info(message);
        }
      }
    })
  );

  app.use(express.static(path.resolve(__dirname, 'public')));

  app.get('/', (_, res) => {
    res.sendFile('public/index.html', { root: __dirname });
  });

  app.get('/products', async (_, res) => {
    const products = await ProductRepository.findByPrice(60);
    res.send(products);
  });

  app.listen(process.env.PORT, () =>
    logger.info(`App is running on ${process.env.PORT}.`)
  );
});

process.on('beforeExit', () => {
  connectionDriver.disconnect();
});
