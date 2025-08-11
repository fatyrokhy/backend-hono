import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'


export const signToken = (payload) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN })


export const verifyToken = (token) =>
  jwt.verify(token, env.JWT_SECRET)