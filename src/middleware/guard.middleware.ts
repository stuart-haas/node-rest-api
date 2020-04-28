import { Request, Response, NextFunction } from "express";

export function Authenticate(req:Request, res:Response, next:NextFunction) {
  res.status(401).json({error: 'You are not authorized to make this request'});
}