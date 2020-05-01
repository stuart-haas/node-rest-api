import { Service } from '@common/decorator';

@Service()
export class Logger {

  info(message:string) {
    console.log(message);
  }
}