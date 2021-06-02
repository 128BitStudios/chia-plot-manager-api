import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import PlotService, { PlotDetails } from './services/plot.service';
import ChiaLogReader from './utils/chiaLogReader.utils';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req: Request, res: Response) => {
  res.send({ data: 'Pong' })
});

app.get('/version', (req: Request, res: Response) => {
  res.send({ data: '0.0.1' })
});

app.get('/plot/all', (req: Request, res: Response) => {
  try {
    const logs = PlotService.getAllLogs();
    const logCount = logs.length;
    const plots: PlotDetails[] = [];

    logs.forEach((log, index) => {
      const plot = new PlotService(log);
      let plotDetails: any = {};

      console.log(index);

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

      plots.push(plotDetails);
    });

    res.send({
      data: plots,
      count: logCount,
    });
  }
  catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/plot/latest', (req: Request, res: Response) => {
  try {
    const logs = PlotService.getAllLogs();
    const logCount = logs.length;
    const latestLog = logs[logCount - 1];

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

    res.send({
      data: plotDetails,
    });
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/plot/running', (req: Request, res: Response) => {
  try {
    const logs = PlotService.getAllLogs();
    let logCount = logs.length;
    const plots: PlotDetails[] = [];

    logs.forEach((log) => {
      const plot = new PlotService(log);
      let plotDetails: any = {};

      if (plot.plotIsFinished()) {
        return;
      }

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

      plots.push(plotDetails);
    });

    plots.filter((plot) => plot.phases.length <= 3);
    logCount = plots.length;

    res.send({
      data: plots,
      count: logCount,
    });
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/plot/completed', (req: Request, res: Response) => {
  try {
    const logs = PlotService.getAllLogs();
    let logCount = logs.length;
    const plots: PlotDetails[] = [];

    logs.forEach((log) => {
      const plot = new PlotService(log);
      let plotDetails: any = {};

      if (!plot.plotIsFinished()) {
        return;
      }

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

      plots.push(plotDetails);
    });

    plots.filter((plot) => plot.phases.length === 4);
    logCount = plots.length;

    res.send({
      data: plots,
      count: logCount,
    });
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/plot/index/:index', (req: Request, res: Response) => {
  const index: number = Number(req.params.index);

  if (!index) {
    res.statusMessage = JSON.stringify({ error: 'No index number provided in URL' });
    res.status(400).end();
  }

  try {
    const logs = PlotService.getAllLogs();
    const selectedLog = logs[index];

    const plot = new PlotService(selectedLog);
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

    res.send({
      data: plotDetails,
    });
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
    const log = plot.getLog();

    res.send({
      data: log,
    });
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/plot/index/:index/log', (req: Request, res: Response) => {
  const index: number = Number(req.params.index);

  if (!index) {
    res.statusMessage = JSON.stringify({ error: 'No index number provided in URL' });
    res.status(400).end();
  }

  try {
    const logs = PlotService.getAllLogs();
    const logByIndex = logs[index];

    const plot = new PlotService(logByIndex);
    const log = plot.getLog();

    res.send({
      data: log,
    });
  } catch (error: any) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
