import { render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import { MessageClient } from '../src/shared/MessageClient.types';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { MessagePayload } from 'server/src/types/Message.types';
import { Visibility } from 'server/src/types/MessageState.types';

describe('App', () => {
  it(`Creates and retrieves messages`, async () => {
    const messages: Array<string> = [];

    const messageClient: MessageClient = {
      create: async (newMessage: MessagePayload) => {
        messages.push(newMessage.message);
      },
      get: async () =>
        messages.map((message) => ({
          id: `someId-${Math.floor(Math.random() * 100)}`,
          liked: false,
          message,
          visibility: Visibility.PUBLIC,
        })),
      like() {
        return Promise.resolve(undefined);
      },
    };

    render(<App messageClient={messageClient} />);

    await userEvent.type(screen.getByRole('textbox'), 'Hello Saturn!');
    await userEvent.click(screen.getByText('Create new message'));

    await userEvent.type(screen.getByRole('textbox'), 'Hello Jupiter!');
    await userEvent.click(screen.getByText('Create new message'));

    await waitFor(() => {
      expect(screen.queryByText('Hello Saturn!')).toBeInTheDocument();
      expect(screen.queryByText('Hello Jupiter!')).toBeInTheDocument();
    });
  });

  it(`Like a message`, async () => {
    let message = {
      id: 'someId',
      message: 'someMessage',
      liked: false,
      visibility: Visibility.PUBLIC,
    };
    const messageClient: MessageClient = {
      create: async () => {},
      get: async () => [message],
      like: async () => {
        message = {
          ...message,
          liked: true,
        };
      },
    };

    render(<App messageClient={messageClient} />);

    await waitFor(() => {
      expect(screen.getByText('someMessage')).toBeInTheDocument();
      expect(screen.queryByText('👍')).not.toBeInTheDocument();
    });

    await userEvent.click(screen.getByLabelText('like-message'));

    await waitFor(() => expect(screen.getByText('👍')).toBeInTheDocument());
  });

  it('It can create a private message', async () => {
    const messages: Array<MessagePayload> = [];

    const messageClient: MessageClient = {
      create: async (newMessage: MessagePayload) => {
        messages.push(newMessage);
      },
      get: async () =>
        messages.map((messagePayload) => ({
          id: `someId-${Math.floor(Math.random() * 100)}`,
          liked: false,
          message: messagePayload.message,
          visibility: messagePayload.visibility,
        })),
      like() {
        return Promise.resolve(undefined);
      },
    };

    render(<App messageClient={messageClient} />);
    const select = screen.getAllByText('Public')[0].parentElement;

    await userEvent.selectOptions(select!, Visibility.PRIVATE);
    await userEvent.type(screen.getByRole('textbox'), 'Hello Saturn!');
    await userEvent.click(screen.getByText('Create new message'));

    await userEvent.selectOptions(select!, Visibility.PUBLIC);
    await userEvent.type(screen.getByRole('textbox'), 'Hello Jupiter!');
    await userEvent.click(screen.getByText('Create new message'));

    await waitFor(() => {
      const firstMessage = screen.queryByText('Hello Saturn!');
      const firstVisibility = within(firstMessage?.parentElement!).queryByText('private');
      expect(firstMessage).toBeInTheDocument();
      expect(firstVisibility).toBeInTheDocument();

      const secondMessage = screen.queryByText('Hello Jupiter!');
      const secondVisibility = within(secondMessage?.parentElement!).queryByText('public');
      expect(secondMessage).toBeInTheDocument();
      expect(secondVisibility).toBeInTheDocument();
    });
  });
});
