import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: '1',
  database: 'meuspresentes',
});

client.connect();

export async function query(query: any, values?: any) {
  const { rows } = await client.query(query, values);
  return rows;
};