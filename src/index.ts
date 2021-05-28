import express, { Express, Request, response, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fs from 'fs';
import ChiaLogReader from './utils/chiaLogReader.utils';
import PlotService, { PlotDetails } from './services/plot.service';

dotenv.config();

const PORT = process.env.PORT || 3000;
const CHIA_LOGS = process.env.CHIA_LOGS || '/chia-logs';

const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong');
});

app.get('/plot/latest', (req: Request, res: Response) => {
  try {
    const logs = PlotService.getAllLogs();
    const logCount = logs.length;
    const latestLog = logs[logCount - 10];

    const plot = new PlotService(latestLog);
    let plotDetails: any = {};

    try {
      plotDetails = plot.getPlotDetails();
    } catch (error) {
      process.env?.DEBUG == 'true' ? console.error(error) : false;
    }

    try {
      plotDetails.phases[0] = plot.getPlotPhaseDetails(1);
    } catch (error) {
      process.env?.DEBUG == 'true' ? console.error(error) : false;
    }

    try {
      plotDetails.phases[1] = plot.getPlotPhaseDetails(2);
    } catch (error) {
      process.env?.DEBUG == 'true' ? console.error(error) : false;
    }

    try {
      plotDetails.phases[2] = plot.getPlotPhaseDetails(3);
    } catch (error) {
      process.env?.DEBUG == 'true' ? console.error(error) : false;
    }

    try {
      plotDetails.phases[3] = plot.getPlotPhaseDetails(4);
    } catch (error) {
      process.env?.DEBUG == 'true' ? console.error(error) : false;
    }

    res.send(plotDetails);
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/plot/latest/log', (req: Request, res: Response) => {
  try {
    const logs = PlotService.getAllLogs();
    const logCount = logs.length;
    const latestLog = logs[logCount - 1];

    const plot = new PlotService(latestLog);

    res.send(plot.data);
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
