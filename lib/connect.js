import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || 'libsql://database-futnowapp-futbolnowapp.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export default turso;