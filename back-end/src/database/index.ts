import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

//ssl:true needed for prodution
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

export async function query(query: string, values?: any[]) {
  const { rows } = await client.query(query, values);
  return rows;
};