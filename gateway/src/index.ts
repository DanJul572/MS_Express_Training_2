import express from 'express';
import proxy from 'express-http-proxy';
import config from './config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.USER_APP_URL) {
  const user = proxy(config.USER_APP_URL);
  app.use('/api/user', user);
  console.log('User App us running');
}

if (config.NOTIFICATION_APP_URL) {
  const notification = proxy(config.NOTIFICATION_APP_URL);
  app.use('/api/notificaiton', notification);
  console.log('Notification App us running');
}

const server = app.listen(config.PORT, () => {
  console.log(`Gateway is Listening to Port ${config.PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
