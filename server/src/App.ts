import fastify, { FastifyInstance, RequestGenericInterface } from 'fastify';
import fastifyCors from 'fastify-cors';
import { Server } from 'https';
import { MessageQuery } from './types';
import { client, postgrator } from './Database';
import { getMessagesHandler, postMessagesHandler, patchMessagsHandler } from './handlers';

export class App {
  private readonly fastify: FastifyInstance<Server>;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.fastify = fastify({
      logger: true,
    });
    this.fastify.register(fastifyCors);
    this.fastify.post('/messages', postMessagesHandler);
    this.fastify.get<{ Querystring: MessageQuery }, RequestGenericInterface>('/messages', getMessagesHandler);
    this.fastify.patch('/messages/:id', patchMessagsHandler);
  }

  async start() {
    const appliedMigrations = await postgrator.migrate();
    console.log(`App applied migrations: ${appliedMigrations}`);

    await client.connect();
    console.log(`Connected to db`);

    const url = await this.fastify.listen(this.port);
    console.log(`App listening on: ${url}`);
  }

  async stop() {
    await client.end();
    return this.fastify.close();
  }
}
