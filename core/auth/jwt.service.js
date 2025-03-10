import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_OPTIONS = {
  expiresIn: '1h',
  issuer: 'rapidfront-cms',
  jwtid: uuidv4()
};

export class JWTService {
  static generateToken(payload, options = {}) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { ...DEFAULT_OPTIONS, ...options }
    );
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('INVALID_TOKEN');
    }
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }
}