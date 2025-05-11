import express from 'express';
import config from './config';
import sendEmail from './service/send-email';

const app = express();

const server = app.listen(config.PORT, () => {
  console.log(`User App is running on port ${config.PORT}`);
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

sendEmail().catch(console.error);

const unexpectedErrorHandler = (error: unknown) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
