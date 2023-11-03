import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:1@localhost:5433/meuspresentes',
  ssl: false,
});

client.connect();

export async function query(query: string, values?: any[]) {
  const { rows } = await client.query(query, values);
  return rows;
};