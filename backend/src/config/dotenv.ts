import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const SERVICE_NAME = process.env.SERVICE_NAME || 'nexplore-test-api';

export const DB_HOST = process.env.DB_HOST || 'postgresdb';
export const DB_PORT = parseInt(process.env.DB_PORT!) || 5432;
export const DB_NAME = process.env.DB_NAME || 'nexplore';
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'secret';
