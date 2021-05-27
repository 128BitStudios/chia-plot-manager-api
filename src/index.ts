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

    const fileData = fs.readFileSync(fullLogs[fullLogs.length - 1], 'utf-8');
    console.log(fullLogs[fullLogs.length - 1]);

    const chiaLogReader = new ChiaLogReader(fileData);

    // Plot
    console.log('Plot Temp Dirs: ', chiaLogReader.getTempDirs());
    console.log('Plot Size: ', chiaLogReader.getPlotSize());
    console.log('Plot Buffer Size: ', chiaLogReader.getBufferSize());
    console.log('Plot Buckets: ', chiaLogReader.getBuckets());
    console.log('Plot Threads: ', chiaLogReader.getThreads());

    // Phase 1
    console.log('Phase (1) Start Time: ', chiaLogReader.getPhaseStartTime(1));
    console.log('Phase (1) Elapsed Time: ', chiaLogReader.getPhaseEndElapsed(1));
    console.log('Phase (1) CPU Usage: ', chiaLogReader.getPhaseEndCPU(1));
    console.log('Phase (1) End Time: ', chiaLogReader.getPhaseEndTime(1));

    // Phase 2
    console.log('Phase (2) Start Time: ', chiaLogReader.getPhaseStartTime(2));
    console.log('Phase (2) Elapsed Time: ', chiaLogReader.getPhaseEndElapsed(2));
    console.log('Phase (2) CPU Usage: ', chiaLogReader.getPhaseEndCPU(2));
    console.log('Phase (2) End Time: ', chiaLogReader.getPhaseEndTime(2));

    // // Phase 3
    console.log('Phase (3) Start Time: ', chiaLogReader.getPhaseStartTime(3));
    console.log('Phase (3) Elapsed Time: ', chiaLogReader.getPhaseEndElapsed(3));
    console.log('Phase (3) CPU Usage: ', chiaLogReader.getPhaseEndCPU(3));
    console.log('Phase (3) End Time: ', chiaLogReader.getPhaseEndTime(3));

    // // Phase 4
    console.log('Phase (4) Start Time: ', chiaLogReader.getPhaseStartTime(4));
    console.log('Phase (4) Elapsed Time: ', chiaLogReader.getPhaseEndElapsed(4));
    console.log('Phase (4) CPU Usage: ', chiaLogReader.getPhaseEndCPU(4));
    console.log('Phase (4) End Time: ', chiaLogReader.getPhaseEndTime(4));

    res.send();
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
