import { Request, Response } from 'express';
import { Controller, Get, Post, Middleware } from '@common/decorator';
import { VerifyToken, SignToken } from '@middleware/auth.middleware';
import { Controller as IController } from '@common/interface';
import { Logger } from '@service/logger.service';

@Controller('users')
export class UserController implements IController {

  constructor(protected logger:Logger) {}

  @Get()
  @Middleware([VerifyToken])
  public index(req:Request, res:Response) {
    res.status(200).send({data:'Viewing all users'});
  }

  @Post('login')
  @Middleware([SignToken])
  public create(req:Request, res:Response) {
    res.status(200).send({data:'User logged in'});
  }
}