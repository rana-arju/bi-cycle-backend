import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  database: process.env.DATABASE_URL,
  port: process.env.PORT,
  token: process.env.JWT_ACCESS_TOKEN,
  token_time: process.env.JWT_ACCESS_EXPIRES,
  refresh: process.env.REFRESH_TOKEN,
  node_env: process.env.NODE_ENV,
  salt_rounds: process.env.SALT_ROUNDS,
  refresh_time: process.env.REFRESH_ACCESS_EXPIRES,
  sp: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_username: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url: process.env.SP_RETURN_URL,
  },
};
