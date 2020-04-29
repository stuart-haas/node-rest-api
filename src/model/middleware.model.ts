import { RequestHandler } from 'express';

export interface MiddlewareDefinition {
  actions: RequestHandler[]
}