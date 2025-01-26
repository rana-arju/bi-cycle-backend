import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  database: process.env.DATABASE_URL,
  port: process.env.PORT,
  token: process.env.JWT_ACCESS_TOKEN,
  token_time: process.env.JWT_ACCESS_EXPIRES,
  refresh: process.env.REFRESH_TOKEN,
  node_env: process.env.NODE_ENV,
  salt_rounds: process.env.SALT_ROUNDS,
  refresh_time: process.env.REFRESH_ACCESS_EXPIRES,
};
