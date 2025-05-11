import type { Request, Response } from 'express';

import { User } from '../models';

import {
  createApiError,
  createSendToken,
  encryptPassword,
  isPasswordMatch,
} from '../utils';
import MessageBroker from '../services/amqp-client';

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw createApiError(400, 'User already exists!');
    }

    const user = await User.create({
      name,
      email,
      password: await encryptPassword(password),
    });

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    MessageBroker.send('SEND_EMAIL', JSON.stringify(userData));

    return res.json({
      status: 200,
      message: 'User registered successfully!',
      data: userData,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await isPasswordMatch(password, user.password as string))) {
      throw createApiError(400, 'Incorrect email or password');
    }

    const token = await createSendToken(user, res);

    return res.json({
      status: 200,
      message: 'User logged in successfully!',
      token,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return res.json({
      status: 500,
      message,
    });
  }
};

export default {
  register,
  login,
};
