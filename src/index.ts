import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fs from 'fs';
import ChiaLogReader from './utils/chiaLogReader';

dotenv.config();

const PORT = process.env.PORT || 3000;
const CHIA_LOGS = process.env.CHIA_LOGS || '/chia-logs';

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
    const files = fs.readdirSync(CHIA_LOGS);
    const fullLogs: any = [];

    files.forEach((path) => {
      const fullPath = `${CHIA_LOGS}/${path}`;
      const fileStats = fs.statSync(fullPath);
      fileStats.size > 200000 ? fullLogs.push(fullPath) : false; // 200,000 is assumed a full log
    });

    // console.log(files.length);
    // console.log(fullLogs.length);

    const fileData = fs.readFileSync(fullLogs[fullLogs.length - 1], 'utf-8');
    console.log(fullLogs[fullLogs.length - 1]);

    const chiaLogReader = new ChiaLogReader(fileData);
    console.log(chiaLogReader.getTempDirs());
    console.log(chiaLogReader.getPlotSize());
    console.log(chiaLogReader.getBufferSize());
    console.log(chiaLogReader.getBuckets());
    console.log(chiaLogReader.getThreads());
    console.log(chiaLogReader.getPhaseStartTime(1));
    console.log(chiaLogReader.getPhaseStartTime(2));
    console.log(chiaLogReader.getPhaseStartTime(3));
    console.log(chiaLogReader.getPhaseStartTime(4));

    res.send();
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
