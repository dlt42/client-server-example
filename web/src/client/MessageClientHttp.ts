import fetch from 'isomorphic-fetch';
import { Message, MessagePayload } from 'server/src/types';
import { MessageClient, MessageFilters, UUID } from '../shared';

export class MessageClientHttp implements MessageClient {
  constructor(private readonly baseUrl: string) {}

  async create(newMessage: MessagePayload): Promise<void> {
    await fetch(`${this.baseUrl}/messages`, { method: 'POST', body: JSON.stringify(newMessage) });
  }

  async get(filters: MessageFilters): Promise<Array<Message>> {
    const query: string[] = [];
    const keys = Object.keys(filters) as (keyof MessageFilters)[];
    keys.forEach((key) => {
      if (filters[key]) {
        query.push(`${key}=${filters[key]}`);
      }
    });
    const queryString = query.length ? `?${query.join('&')}` : '';
    const messages = await fetch(`${this.baseUrl}/messages${queryString}`, { method: 'GET' }).then((response) =>
      response.json(),
    );
    return Promise.resolve(messages);
  }

  async like(messageId: UUID): Promise<void> {
    await fetch(`${this.baseUrl}/messages/${messageId}`, {
      method: 'PATCH',
      body: JSON.stringify({ liked: true }),
    });
  }
}
