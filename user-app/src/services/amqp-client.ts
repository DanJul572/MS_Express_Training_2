import { AMQPClient } from '@cloudamqp/amqp-client';
import config from '../config';

async function send(queue: string, data: string) {
  try {
    if (!config.LAVINMQ_URL) {
      throw 'LAVINMQ_URL is not defined';
    }
    const connection = new AMQPClient(config.LAVINMQ_URL);
    await connection.connect();
    const channel = await connection.channel();

    await channel.queue(queue, { durable: false });
    await channel.basicPublish('', queue, data);
  } catch (error) {
    console.error(error);
  }
}

const MessageBroker = {
  send,
};

export default MessageBroker;
