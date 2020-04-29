import { RequestHandler } from "express";

export interface Route {
  path:string;
  method:string
  action?:string | symbol;
  middlewares?:RequestHandler[];
}