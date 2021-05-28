import fs from 'fs';
import moment from 'moment';
import ChiaLogReader from '../utils/chiaLogReader.utils';

export interface PlotDetails {
  startTime: string;
  elapsedTime: string;
  tempDirs: string[];
  size: number;
  memory: string;
  buckets: number;
  threads: number;
  phases: PlotPhaseDetails[];
}

export interface PlotPhaseDetails {
  number: number;
  startTime: string;
  elapsedTime: string;
  cpuUsage: string;
  endTime: string;
}

export default class PlotService {
  public data: ChiaLogReader;

  constructor(data: ChiaLogReader) {
    this.data = data;
  }

  public getPlotDetails(): PlotDetails {
    return {
      startTime: this.data.getPlotStartTime(),
      elapsedTime: moment(this.data.getPlotStartTime()).diff(moment(new Date())).toString(),
      tempDirs: this.data.getTempDirs(),
      size: this.data.getPlotSize(),
      memory: this.data.getBufferSize(),
      buckets: this.data.getBuckets(),
      threads: this.data.getThreads(),
      phases: [],
    };
  }

  public getPlotPhaseDetails(phase: number): PlotPhaseDetails {
    return {
      number: phase,
      startTime: this.data.getPhaseStartTime(phase),
      elapsedTime: this.data.getPhaseEndElapsed(phase),
      cpuUsage: this.data.getPhaseEndCPU(phase),
      endTime: this.data.getPhaseEndTime(phase),
    };
  }

  public static getLog(filename: string): ChiaLogReader {
    const fullPath = `${process.env.CHIA_LOGS}/${filename}`;
    const fileData = fs.readFileSync(fullPath, 'utf-8');
    const chiaLogReader = new ChiaLogReader(fileData);

    return chiaLogReader;
  }

  public static getAllLogs(): ChiaLogReader[] {
    const files = fs.readdirSync(process.env.CHIA_LOGS as string);
    const logs: ChiaLogReader[] = [];

    files.forEach((filename) => {
      const fullPath = `${process.env.CHIA_LOGS}/${filename}`;
      const fileData = fs.readFileSync(fullPath, 'utf-8');
      const chiaLogReader = new ChiaLogReader(fileData);

      logs.push(chiaLogReader);
    });

    return logs;
  }
}
