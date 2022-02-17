import express from 'express';
import path from 'path';
import { faker } from '@faker-js/faker';

const app = express();

const countup = (res: express.Response) => {
  res.write(
    'data: ' +
      JSON.stringify({
        username: faker.internet.userName(),
        message: faker.lorem.words(Math.floor(Math.random() * 12) + 1),
      }) +
      '\n\n'
  );

  setTimeout(() => countup(res), 1000);
};

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve('views/home.html'));
});

app.get('/stream', (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  countup(res);
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
