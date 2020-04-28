import { Service } from '@decorator/service.decorator';

@Service()
export class Logger {

  info(message:string) {
    console.log(message);
  }
}