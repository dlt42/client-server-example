import { Message, MessagePayload, LikedFilterValue, VisibilityFilterValue } from 'server/src/types';
import { UUID } from './Misc.types';

export type MessageFilters = {
  visibility: VisibilityFilterValue;
  liked: LikedFilterValue;
};

export interface MessageClient {
  get: (filters: MessageFilters) => Promise<Array<Message>>;
  create: (newMessage: MessagePayload) => Promise<void>;
  like: (messageId: UUID) => Promise<void>;
}
