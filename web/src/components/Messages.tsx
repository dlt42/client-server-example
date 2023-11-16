import { useMessages } from '../context';
import React from 'react';

export const Messages = () => {
  const { messages, likeMessage } = useMessages();
  return (
    <ol style={{ lineHeight: '3em' }} role="list">
      {messages
        .sort((left, right) => (left.id > right.id ? 1 : -1))
        .map((message) => (
          <li key={message.id}>
            <button aria-label="like-message" onClick={likeMessage(message.id)}>
              Like
            </button>
            <div className='status'>
              <span>
                {message.liked && '👍'}
              </span>
              <span>
                {message.visibility === 'public' ? '🙂' : '🫥'}
              </span>
            </div>
            <span>{message.message}</span>
          </li>
        ))}
    </ol>
  );
};
