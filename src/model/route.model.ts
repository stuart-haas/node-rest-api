import { RequestHandler } from "express";

export interface RouteDefinition {
  path: string;
  method: string
  action?: string | symbol;
  middlewares?: RequestHandler[];
}