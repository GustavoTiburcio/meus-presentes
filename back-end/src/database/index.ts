import { Client } from 'pg';

const client = new Client({
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT ? +process.env.PORT : 5433,
  user: process.env.USER || 'postgres',
  password: process.env.PASSWORD || '1',
  database: process.env.DATABASE || 'meuspresentes'
});

client.connect();

export async function query(query: string, values?: any[]) {
  const { rows } = await client.query(query, values);
  return rows;
};