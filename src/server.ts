import express, { Application } from 'express';
import path from 'path';

const PORT = 8090;
const app: Application = express();

app.use(express.static('dist'));

app.get('*', (_, res) => {
  const rootHtmlPath = path.join(__dirname, '/dist/index.html');
  res.sendFile(rootHtmlPath);
});

app.listen(PORT, () => console.log(`App is running on ${PORT}.`));
