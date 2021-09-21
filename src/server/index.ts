import express, { Application } from 'express';
import path from 'path';
import ProductRepository from './repositories/product';
import connectionDriver from './databaseConnection';

const app: Application = express();

connectionDriver
  .connect()
  .then(() => {
    console.log('Connected to DB.');
    app.emit('ready');
  })
  .catch((e) => {
    console.error(e);
  });

app.on('ready', () => {
  app.use(express.static(path.resolve(__dirname, 'public')));

  app.get('/', (_, res) => {
    res.sendFile('public/index.html', { root: __dirname });
  });

  app.get('/products', async (_, res) => {
    const products = await ProductRepository.findByPrice(60);
    res.send(products);
  });

  app.listen(process.env.PORT, () =>
    console.log(`App is running on ${process.env.PORT}.`)
  );
});

process.on('beforeExit', () => {
  connectionDriver.disconnect();
});
