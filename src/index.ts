import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Anybody there?!</h1>');
});

app.get('/webhook/ping', (req: Request, res: Response) => {
  res.send('Pong!');
});

app.post('/webhook', (req: Request, res: Response) => {
  try {
    const timestamp = `[${new Date().toISOString()}]`
    const log = `${timestamp} ${req.body.content}`;
    console.log(log);
    fs.writeFileSync(`logs/main.log`, log + "\n", { flag: 'a', encoding: 'utf-8' });
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/logs/full', (req: Request, res: Response) => {
  try {
    const logs = fs.readFileSync(`logs/main.log`, 'utf-8');
    res.send(logs.replace(/['"]+/g, ''));
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
