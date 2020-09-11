import "reflect-metadata"
import * as express from "express"
import { Request, Response, NextFunction } from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as helmet from "helmet"
import * as cookieParser from "cookie-parser"
import { UserController } from "@controller/user.controller"
import { Route, Controller } from "@common/interface"
import { Injector } from "common/injector"
import * as dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

[UserController].forEach(controller => {
  const instance = Injector.resolve<Controller>(controller)
  const prefix = Reflect.getMetadata("prefix", controller)
  const routes: Array<Route> = Reflect.getMetadata("routes", controller)
  routes.forEach(route => {
    app[route.method](prefix + route.path, route.middlewares, (req: Request, res: Response, next: NextFunction) => {
      instance[route.action](req, res, next)
    })
  })
})

app.listen(PORT)

console.log(`Express application is up and running on port ${PORT}`)