import { config } from 'dotenv';

const configFile = './.env';

config({ path: configFile });

const { MONGO_URL, PORT, SECRET_KEY, NODE_ENV, LAVINMQ_URL } = process.env;

export default {
  MONGO_URL,
  PORT,
  SECRET_KEY,
  NODE_ENV,
  LAVINMQ_URL,
};
