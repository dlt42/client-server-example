import { client } from '../Database';
import { v4 as uuid } from 'uuid';
import { MessagePayload, PostMessagesHandler } from '../types';

export const postMessagesHandler: PostMessagesHandler = async (request, reply) => {
  const messagePayload = JSON.parse(request.body as unknown as string) as MessagePayload;
  const { message, visibility } = messagePayload;
  await client.query(
    `INSERT INTO messages (id, message, liked, visibility) VALUES ('${uuid()}', '${message}', FALSE, '${visibility}');`,
  );
  return reply.code(201).send();
};
