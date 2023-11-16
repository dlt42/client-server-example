import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useFilters } from './filterContext';
import { Visibility, Message } from 'server/src/types';
import { MessageClient, UUID } from '../shared';

type MessageContextValue = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  likeMessage: (messageId: UUID) => () => Promise<void>;
  createNewMessage: (message: string, visibility: Visibility) => Promise<void>;
};

const MessageContext = React.createContext<MessageContextValue>(null!);

export const MessageProvider = ({ children, messageClient }: { children: ReactNode; messageClient: MessageClient }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { liked: likedFilter, visibility: visibilityFilter } = useFilters();
  const getMessages = useCallback(async () => {
    const messages = await messageClient.get({
      visibility: visibilityFilter.filter.value,
      liked: likedFilter.filter.value,
    });
    setMessages(messages);
  }, [visibilityFilter, likedFilter]);
  const likeMessage = (messageId: UUID) => async () => {
    await messageClient.like(messageId);
    await getMessages();
  };
  const createNewMessage = async (message: string, visibility: Visibility) => {
    await messageClient.create({ message, visibility });
    await getMessages();
  };
  useEffect(() => {
    getMessages();
  }, [getMessages]);
  return (
    <MessageContext.Provider value={{ messages, setMessages, likeMessage, createNewMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
