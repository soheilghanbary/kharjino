import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const client = neon(
  'postgresql://tony:npg_I2zAb8hRFDTW@ep-hidden-wildflower-agvlbe1k-pooler.c-2.eu-central-1.aws.neon.tech/kharjino?sslmode=require&channel_binding=require'
)

export const db = drizzle({ client, schema })
