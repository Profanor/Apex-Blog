import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define the shape of the user object in the token payload
interface TokenPayload {
  id: string;
  username: string;
}

// Extend the Request interface to include the authenticated user
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

// Middleware to authenticate the token
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey') as TokenPayload;
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
