import { Visibility } from "./";

export type UUID = string;

export type Message = {
  id: UUID;
  message: string;
  liked: boolean;
  visibility: Visibility;
};

export type MessagePayload = {
  message: string;
  visibility: Visibility;
}

