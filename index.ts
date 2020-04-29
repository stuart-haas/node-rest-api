import "reflect-metadata";
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as cookieParser from "cookie-parser"
import { UserController } from '@controller/user.controller';
import { Controller } from '@decorator/controller.decorator';
import { RouteDefinition } from '@model/route.model';
import { Injector } from '@util/injector';
import * as dotenv from "dotenv";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

[
  UserController
].forEach(controller => {
  // This is our instantiated class
  const instance                       = Injector.resolve<Controller>(controller);
  // The prefix saved to our controller
  const prefix                         = Reflect.getMetadata('prefix', controller);
  // Our `routes` array containing all our routes for this controller
  const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);
  
  // Iterate over all routes and register them to our express application 
  routes.forEach(route => {
    // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
    // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
    // this should be enough for now.
    app[route.method](prefix + route.path, route.middlewares, (req: Request, res: Response, next: NextFunction) => {
      // Execute our method for this path and pass our express request and response object.
      instance[route.action](req, res, next);
    });
  });
});

app.listen(PORT);

console.log(`Express application is up and running on port ${PORT}`);