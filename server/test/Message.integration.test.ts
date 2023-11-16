import { App } from '../src/App';
import fetch from 'node-fetch';
import { Message, Visibility } from '../src/types';

describe('Message', () => {
  const port = 6000;
  let app: App;

  beforeAll(async () => {
    app = new App(port);
    await app.start();
  });

  afterAll(async () => {
    await app.stop();
  });

  test('Creates and retrieves all messages', async () => {
    const message1 = {
      message: 'message-' + Math.round(Math.random() * 1_000_000_000),
      visibility: 'public',
    };
    const message2 = {
      message: 'message-' + Math.round(Math.random() * 1_000_000_000),
      visibility: 'public',
    };

    const postResult1 = await fetch(`http://localhost:${port}/messages`, {
      method: 'POST',
      body: JSON.stringify(message1),
    });
    expect(postResult1.status).toBe(201);

    const postResult2 = await fetch(`http://localhost:${port}/messages`, {
      method: 'POST',
      body: JSON.stringify(message2),
    });
    expect(postResult2.status).toBe(201);

    const getResult = await fetch(`http://localhost:${port}/messages`, { method: 'GET' });
    expect(getResult.status).toBe(200);
    
    const messages = await getResult.json();
    expect(messages).toEqual(
      expect.arrayContaining([
        {
          id: expect.stringMatching(/^.+$/),
          message: message1.message,
          liked: false,
          visibility: Visibility.PUBLIC,
        },
        {
          id: expect.stringMatching(/^.+$/),
          message: message2.message,
          liked: false,
          visibility: Visibility.PUBLIC,
        },
      ]),
    );
  });

  test('Like a message', async () => {
    const message1 = {
      message: 'message-' + Math.round(Math.random() * 1_000_000_000),
      visibility: 'public',
    };
    const message2 = {
      message: 'message-' + Math.round(Math.random() * 1_000_000_000),
      visibility: 'public',
    };

    await fetch(`http://localhost:${port}/messages`, {
      method: 'POST',
      body: JSON.stringify(message1),
    });
    await fetch(`http://localhost:${port}/messages`, {
      method: 'POST',
      body: JSON.stringify(message2),
    });

    const messages: Message[] = await (await fetch(`http://localhost:${port}/messages`, { method: 'GET' })).json();

    const likedMessage = messages.find((message) => message.message === message1.message)!;
    const unlikedMessage = messages.find((message) => message.message === message2.message)!;

    const likeMessageResponse = await fetch(`http://localhost:${port}/messages/${likedMessage.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ liked: true }),
    });
    expect(likeMessageResponse.status).toBe(204);

    const updatedMessages = await (await fetch(`http://localhost:${port}/messages`, { method: 'GET' })).json();
    expect(updatedMessages).toEqual(
      expect.arrayContaining([
        {
          id: likedMessage.id,
          message: likedMessage.message,
          liked: true,
          visibility: Visibility.PUBLIC,
        },
        {
          id: unlikedMessage.id,
          message: unlikedMessage.message,
          liked: false,
          visibility: Visibility.PUBLIC,
        },
      ]),
    );
  });
});
