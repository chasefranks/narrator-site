import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }


  /**
   * log - logs a message to the console
   * Note: This article here...
   *
   * https://www.codemag.com/article/1711021/Logging-in-Angular-Applications
   *
   * looks like it implements a proper logging
   * example step by step. Great read!
   *
   * @param  {type} message: any object (string usually) we want
   * to log to the console
   */
  log(message: any) {
      console.log(`${new Date()}: ${JSON.stringify(message)}`);
  }

}
