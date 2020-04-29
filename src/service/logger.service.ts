import { Service } from '@decorator/index';

@Service()
export class Logger {

  info(message:string) {
    console.log(message);
  }
}