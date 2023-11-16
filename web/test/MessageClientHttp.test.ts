import { MessageClientHttp } from '../src/client/MessageClientHttp';
import fastify from 'fastify';
import { MessagePayload } from 'server/src/types/Message.types';
import { Visibility } from 'server/src/types/MessageState.types';
import { UUID } from 'shared/Misc.types';

describe(`Use a remote message server`, () => {
  test(`Create a message`, async () => {
    let messageStore: MessagePayload = {
      message: 'no message',
      visibility: Visibility.PUBLIC
    };

    const server = await fastify({
      logger: true,
    }).post('/messages', async (request, reply) => {
      messageStore = JSON.parse(request.body as unknown as string);
      return reply.code(201).send();
    });
    const baseUrl = await server.listen(0);

    try {
      const messageClient = new MessageClientHttp(baseUrl);

      await messageClient.create({ message: 'a new message', visibility: Visibility.PUBLIC });

      expect(messageStore).toEqual({
        message: 'a new message', 
        visibility: Visibility.PUBLIC
      });
    } finally {
      await server.close();
    }
  });

  test(`Get a message`, async () => {
    const storedMessage = {
      id: '195f4430-fe86-4628-afea-f7e870f0b2a1',
      message: 'a new message',
      visibility: Visibility.PUBLIC,
    };

    const server = await fastify({
      logger: true,
    }).get('/messages', async (_, reply) => {
      return reply.send(storedMessage);
    });
    const baseUrl = await server.listen(0);

    try {
      const messageClient = new MessageClientHttp(baseUrl);

      const retrievedMessage = await messageClient.get({ liked: '', visibility: '' });

      expect(retrievedMessage).toEqual(storedMessage);
    } finally {
      await server.close();
    }
  });

  test(`Like a message`, async () => {
    const messageId = '195f4430-fe86-4628-afea-f7e870f0b2a1';
    const calls: { messageId: UUID; body: object }[] = [];

    const server = await fastify({
      logger: true,
    }).patch(`/messages/:messageId`, async (request, reply) => {
      // @ts-ignore
      const messageId: UUID = request.params.messageId;
      const body: object = JSON.parse(request.body as string);

      calls.push({ messageId, body });
      return reply.code(204).send();
    });
    const baseUrl = await server.listen(0);

    try {
      const messageClient = new MessageClientHttp(baseUrl);

      await messageClient.like(messageId);

      expect(calls).toEqual([{ messageId, body: { liked: true } }]);
    } finally {
      await server.close();
    }
  });
});
