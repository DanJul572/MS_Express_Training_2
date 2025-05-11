import express from 'express';
import config from './config';
import { connectDB } from './database';
import authRouter from './routes/auth-route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

const server = app.listen(config.PORT, () => {
  console.log(`User App is running on port ${process.env.PORT}`);
});

connectDB();

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
