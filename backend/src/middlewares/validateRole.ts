import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserRole } from '../entity/enum/UserRole.enum';
import { JwtPayload } from '../interfaces/JwtPayload.interface';
dotenv.config();

const validateRole = (requiredRoles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization header is missing' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (!requiredRoles.includes(decodedToken.role)) {
      return res.status(403).send({ error: 'Insufficient role' });
    }

    req['user'] = decodedToken;
    return next();
  } catch {
    return res.status(401).send({ error: 'Invalid token' });
  }
};

export default validateRole;
