import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv';
import { seedUsers } from '../seeds/user.seed';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  subscribers: [],
})

export const connect = async () => {
  try {
    await dataSource.initialize();
    await seedUsers(dataSource);
    console.info('> Connected to PostgreSQL database');
  } catch (error){
    console.error('> Error :: ', error);
  }
};
