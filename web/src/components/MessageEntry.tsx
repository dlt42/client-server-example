import { useMessages } from '../context';
import React, { ChangeEvent, useState } from 'react';
import { Visibility } from 'server/src/types';

export const MessageEntry = () => {
  const [newMessage, setNewMessage] = useState('');
  const [visibility, setVisibility] = useState(Visibility.PUBLIC);
  const { createNewMessage } = useMessages();

  const onNewMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };
  const onVisibilityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setVisibility(event.target.value === 'public' ? Visibility.PUBLIC : Visibility.PRIVATE);
  };
  const onCreateNewMessageClick = async () => {
    createNewMessage(newMessage, visibility);
    setNewMessage('');
  };

  return (
    <div className="row">
      <input type="text" value={newMessage} onChange={onNewMessageChange} />
      <select onChange={onVisibilityChange} defaultValue={visibility}>
        <option key={Visibility.PUBLIC} value={Visibility.PUBLIC}>
          Public
        </option>
        <option key={Visibility.PRIVATE} value={Visibility.PRIVATE}>
          Private
        </option>
      </select>
      <button onClick={onCreateNewMessageClick}>Create new message</button>
    </div>
  );
};
