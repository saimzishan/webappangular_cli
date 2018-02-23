import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class LoggerService {
  log(error) {
    console.log("Logger", error);
  }
}

@Injectable()
export class CustomErrorHandler extends ErrorHandler {

  constructor(private logger: LoggerService) { 
       super();
  }

  handleError(error) {
    this.logger.log(error);
    super.handleError(error);  
  }

}