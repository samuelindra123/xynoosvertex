import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as fs from 'fs';
import * as path from 'path';
import * as schema from './schema.js';

const certPath = path.join(process.cwd(), 'cert', 'ca.pem');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(certPath).toString(),
  },
  max: 20,
});

export const db = drizzle(pool, { schema });
