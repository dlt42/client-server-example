import React from 'react';
import { MessageEntry, Messages, Filters } from './components';
import { MessageProvider, FilterProvider } from './context';
import { MessageClient } from './shared';

const App = ({ messageClient }: { messageClient: MessageClient }) => (
  <FilterProvider>
    <MessageProvider messageClient={messageClient}>
      <MessageEntry />
      <Filters />
      <Messages />
    </MessageProvider>
  </FilterProvider>
);

export default App;
