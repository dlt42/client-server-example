
import { MessageQuery } from './';
import { FastifyLoggerInstance, FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';
import { IncomingMessage, Server } from 'http';

type MessagesRequest = FastifyRequest<
  { Querystring: MessageQuery },
  Server,
  IncomingMessage,
  RequestGenericInterface,
  FastifyLoggerInstance
>;

export type GetMessagesHandler = (request: MessagesRequest, reply: FastifyReply) => Promise<FastifyReply>

export type PatchMessagesHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<FastifyReply>;

export type PostMessagesHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<FastifyReply>;

