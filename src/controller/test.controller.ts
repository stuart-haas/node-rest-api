import { Controller } from '@decorator/controller.decorator';
import { Get, Post } from '@decorator/route.decorator';
import { Middleware } from '@decorator/middleware.decorator';
import { Authenticate } from '@middleware/guard.middleware';
import { Request, Response } from 'express';
import { Logger } from '@service/logger.service';

@Controller('/test')
export class TestController implements Controller {

  constructor(protected logger: Logger) {
  }

  @Get()
  @Middleware([Authenticate])
  public index(req: Request, res: Response) {
    return res.status(200).json({data: 'Index route from test controller'});
  }

  @Get('/:id')
  public findById(req: Request, res: Response) {
    return res.status(200).json({data: `Find by id route from test controller with id: ${req.params.id}`});
  }

  @Post()
  public create(req: Request, res: Response) {
    return res.status(200).json({data: `Create route from test controller with username: ${req.body.username} and password: ${req.body.password}`});
  }
}