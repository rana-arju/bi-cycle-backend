import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  database: process.env.DATABASE_URL,
  port: process.env.PORT,
};
