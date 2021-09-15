import express, { Application } from 'express';
import path from 'path';
import db from './db';

const PORT = 8090;
const app: Application = express();

app.use(express.static('dist'));

db.connect()
  .then(() => {
    console.log('Connected');
  })
  .catch((e) => {
    console.error(e);
  });

app.get('/', (_, res) => {
  const rootHtmlPath = path.join(__dirname, '/dist/index.html');
  res.sendFile(rootHtmlPath);
});

app.get('/products', (_, res) => {
  const products = [
    {
      displayName: 'Cyberpank 2077',
      price: '60$'
    },
    {
      displayName:
        'SpongeBob SquarePants: Battle for Bikini Bottom – Rehydrated',
      price: '40$'
    },
    {
      displayName: 'God Of War',
      price: '50$'
    }
  ];

  res.send(products);
});

process.on('beforeExit', () => {
  db.close();
});

app.listen(PORT, () => console.log(`App is running on ${PORT}.`));
