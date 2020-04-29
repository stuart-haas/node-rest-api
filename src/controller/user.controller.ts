import { Controller, Get, Post, Middleware } from '@decorator/index';
import { Request, Response } from 'express';
import { VerifyToken, SignToken } from '@middleware/auth.middleware';
import { IController } from '@controller/controller';

@Controller('users')
export class UserController implements IController {

  @Get()
  @Middleware([VerifyToken])
  public index(req: Request, res: Response) {
    res.status(200).send({data: 'Viewing all users'});
  }

  @Post('login')
  @Middleware([SignToken])
  public create(req: Request, res: Response) {
    res.status(200).send({data: 'User logged in'});
  }
}