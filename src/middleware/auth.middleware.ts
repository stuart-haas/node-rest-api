import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; 

export function VerifyToken(req:Request, res:Response, next:NextFunction) {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).end();
  }

  try {
    jwt.verify(token, process.env.JWT_KEY);
  } catch(e) {
    if(e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }

  return next();
}

export function SignToken(req:Request, res:Response, next:NextFunction) {
  const { username, password } = req.body;
  if(!username || !password) {
    return res.status(401).end();
  }

  const jwtExpiration = parseInt(process.env.JWT_EXPIRATION);

  const token = jwt.sign({ username}, process.env.JWT_KEY, {
    algorithm: 'HS256',
    expiresIn: jwtExpiration
  });

  res.cookie('token', token, { maxAge: jwtExpiration * 1000 });
  return next();
}