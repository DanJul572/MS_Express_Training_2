import { config } from 'dotenv';

const configFile = './.env';

config({ path: configFile });

const { USER_APP_URL, NOTIFICATION_APP_URL, PORT } = process.env;

export default {
  USER_APP_URL,
  NOTIFICATION_APP_URL,
  PORT
};
