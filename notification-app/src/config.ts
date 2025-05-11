import { config } from 'dotenv';

const configFile = './.env';

config({ path: configFile });

const { LAVINMQ_URL, PORT } = process.env;

export default {
  LAVINMQ_URL,
  PORT,
};
