import express, { Application } from 'express';
import path from 'path';
import Product from './models/Product';
import db from './db';

const PORT = 8090;
const app: Application = express();

db.connect()
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
  db.close();
});

app.listen(PORT, () => console.log(`App is running on ${PORT}.`));
