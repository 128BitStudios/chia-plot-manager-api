import moment from 'moment';

export default class ChiaLogReader {
  public data: string;

  constructor(data: string) {
    this.data = data;
  }

  getPlotStartTime(): any {
    const text = this.findText(this.data, new RegExp('(.*) chia', 'gm'), 1) as string;

    if (!text) {
      throw new Error('Could not parse date');
    }

    return moment(text, 'YYYY-MM-DDTHH:mm:ss.SSS').toISOString();
  }

  getTempDirs(): any[string] {
    const text = this.findText(this.data, new RegExp('.*Starting plotting progress into temporary dirs: (.*)', 'gm'), 1) as string;
    return text?.split(' and ');
  }

  getPlotSize(): any {
    const text = this.findText(this.data, new RegExp('.*Plot size is: (.*)', 'gm'), 1);
    return text;
  }

  getBufferSize(): any {
    const text = this.findText(this.data, new RegExp('.*Buffer size is: (.*)', 'gm'), 1);
    return text;
  }

  getBuckets(): any {
    const text = this.findText(this.data, new RegExp('.*Using (.*) buckets.*', 'gm'), 1);
    return text;
  }

  getThreads(): any {
    const text = this.findText(this.data, new RegExp('.*Using (.*) threads.*', 'gm'), 1);
    return text;
  }

  getPhaseStartTime(phase: number): any {
    const text = this.findText(this.data, new RegExp(`.*Starting phase ${phase}\/4: .* tmp files.*?... (.*)`, 'gm'), 1);

    if (!text) {
      throw new Error('Could not parse date');
    }

    return moment(text, 'D HH:mm:ss YYYY').toISOString();
  }

  getPhaseEndElapsed(phase: number): string {
    const line = this.getPhaseEndEntry(phase);
    const text = this.findText(line, new RegExp(`.* = (.*) seconds.*`, 'gm'), 1);

    if (!text) {
      throw new Error(`Seconds for Phase ${phase} could not be parsed`);
    }

    return Number(text).toFixed(2);
  }

  getPhaseEndCPU(phase: number): any {
    const line = this.getPhaseEndEntry(phase);
    const text = this.findText(line, new RegExp(".* CPU \((.*?)\) .*", 'gm'), 1) as string;

    if (!text) {
      throw new Error(`CPU usage for Phase ${phase} could not be parsed`);
    }

    return Number(text.replace('(', '').replace('%)', '')).toFixed(2);
  }

  getPhaseEndTime(phase: number): any {
    const line = this.getPhaseEndEntry(phase);
    const text = this.findText(line, new RegExp(`.* CPU \(.*?\) (.*)`, 'gm'), 2);

    if (!text) {
      throw new Error('Could not parse date');
    }

    return moment(text, 'ddd MMM D HH:mm:ss YYYY').toISOString();
  }

  private getPhaseEndEntry(phase: number): any {
    const text = this.findText(this.data, new RegExp(`.*Time for phase ${phase} = .*`, 'gm'), 0);
    return text;
  }

  private findText(text: string, regex: RegExp, findIndex?: number) {
    try {
      const regexExec = regex.exec(text) as RegExpExecArray;

      if (findIndex === undefined) {
        return regexExec;
      }

      return regexExec[findIndex];
    } catch (error) {
      process.env?.DEBUG == 'true' ? console.error(error) : false;
      return null;
    }
  }
}
