import { text } from "body-parser";

export default class ChiaLogReader {
  public data: string;

  constructor(data: string) {
    this.data = data;
  }

  getTempDirs() {
    const text = this.findText(this.data, /[\n\r].*temporary dirs: \s*([^\n\r]*)/gm);
    return text?.split(' and ');
  }

  getPlotSize(): any {
    const text = this.findText(this.data, /[\n\r].*Plot size is: \s*([^\n\r]*)/gm);
    return text;
  }

  getBufferSize(): any {
    const text = this.findText(this.data, /[\n\r].*Buffer size is: \s*([^\n\r]*)/gm);
    return text;
  }

  getBuckets(): any {
    const text = this.findText(this.data, /[\n\r].*Using (.*) buckets([^\n\r]*)/gm);
    return text;
  }

  getThreads(): any {
    const text = this.findText(this.data, /[\n\r].*Using (.*) threads([^\n\r]*)/gm);
    return text;
  }

  getPhaseStartTime(phase: number): any {
    const text = this.findText(this.data, new RegExp(`/[\n\r].*Starting phase ${phase}\/4: .* ... \s*([^\n\r]*)/`, 'gm'));
    return text;
  }

  private findText(text: string, regex: RegExp) {
    try {
      return Array.from(text.matchAll(regex))[0][1];
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
}
