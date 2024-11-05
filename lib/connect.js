import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Ejemplo de consulta
async function testConnection() {
    try {
      const result = await turso.execute("SELECT * FROM usuarios");
      console.log(result);
    } catch (error) {
      console.error("Error al conectar con Turso DB:", error);
    }
}
  
testConnection();