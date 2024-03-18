import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const JWT_SECRET = process.env.JWT_SECRET || 'JWT Secret'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
export const SENDINBLUE_API_KEY = process.env.SENDINBLUE_API_KEY
export const REDIS_PW = process.env.REDIS_PW
export const REDIS_HOST = process.env.REDIS_HOST
export const GOOGLE_CLIENT_ID = 'No definido aun'