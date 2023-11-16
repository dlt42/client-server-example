import { client } from '../Database';
import { PatchMessagesHandler } from '../types';

export const patchMessagsHandler: PatchMessagesHandler = async (request, reply) => {
  const id = (request.params as { id: string }).id;
  await client.query(`UPDATE messages SET liked = TRUE WHERE id = '${id}'`);
  return reply.code(204).send();
};
