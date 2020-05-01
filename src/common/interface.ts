import { RequestHandler, Request, Response } from 'express';

export interface Controller {}

export interface Route {
  path:string;
  method:string
  action?:string | symbol;
  middlewares?:RequestHandler[];
}