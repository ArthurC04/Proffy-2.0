import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import AuthConfig from '../config/auth';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, AuthConfig.jwt.secret);

    return next();
  } catch (error) {
    throw new Error('Invalid JWT token.');
  }
}
