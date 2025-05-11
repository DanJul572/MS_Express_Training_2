import { AMQPClient } from '@cloudamqp/amqp-client';
import config from '../config';

const lavinmqUrl = config.LAVINMQ_URL;

const sendEmail = async () => {
  if (!lavinmqUrl) {
    return console.log('LAVINMQ_URL is not defined');
  }

  const connection = new AMQPClient(lavinmqUrl);
  await connection.connect();
  const channel = await connection.channel();

  let counter = 0;
  const q = await channel.queue('SEND_EMAIL', { durable: false });

  await q.subscribe({ noAck: true }, async (msg) => {
    try {
      console.log(`Message received (${++counter})`, msg.bodyToString());
    } catch (error) {
      console.error(error);
    }
  });
};

export default sendEmail;
