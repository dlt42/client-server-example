import { client } from '../Database';
import { Message, GetMessagesHandler } from '../types';

export const getMessagesHandler: GetMessagesHandler = async ({ query: { visibility, liked } }, reply) => {
  const queryFilters = [];
  if (visibility) {
    queryFilters.push(` visibility='${visibility}'`);
  }

  if (liked) {
    queryFilters.push(` liked=${liked}`);
  }

  const filterString = queryFilters.length ? ` WHERE${queryFilters.join(' AND')}` : '';
  const query = `SELECT * FROM messages${filterString}`;
  const result = await client.query(`${query}`);

  const messages: Message[] = result.rows.map((row) => ({
    id: row.id,
    message: row.message,
    liked: row.liked,
    visibility: row.visibility,
  }));

  return reply.code(200).send(messages);
};
