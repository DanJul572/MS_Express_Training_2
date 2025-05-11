import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import type { IUser } from '../interface';

const COOKIE_EXPIRATION_DAYS = 90;
const jwtSecret = config.SECRET_KEY as string;
const expirationDate = new Date(
  Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
);
const cookieOptions = {
  expires: expirationDate,
  secure: false,
  httpOnly: true,
};

const createSendToken = async (user: IUser, res: Response) => {
  const { name, email, id } = user;
  const token = jwt.sign({ name, email, id }, jwtSecret, {
    expiresIn: '1d',
  });
  if (config.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  return token;
};

export default createSendToken;
