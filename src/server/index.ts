import express, { Application } from 'express';
import path from 'path';
import Product from './models/Product';
import connection from './databaseConnection';

const app: Application = express();

connection
  .connect()
  .then(() => {
    console.log('Connected to DB.');
  })
  .catch((e) => {
    console.error(e);
  });

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (_, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/products', async (_, res) => {
  const products = await Product.find({});
  res.send(products);
});

process.on('beforeExit', () => {
  connection.disconnect();
});

app.listen(process.env.PORT, () =>
  console.log(`App is running on ${process.env.PORT}.`)
);
