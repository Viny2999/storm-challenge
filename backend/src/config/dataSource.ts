import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: [],
})

export const connect = async () => {
  try {
    await dataSource.initialize();
    await dataSource.runMigrations();
    console.log('> Connected to PostgreSQL database');
  } catch {
    console.log('> Connected to PostgreSQL database');
  }
};