import { IMessage } from "./shared-types";

export interface IMessagesListProps {
  messages: IMessage[];
  selectedUser: string;
}

export interface IMessageInputProps {
  sendMessage: (message: string) => void;
}

export interface IOnlineUsersProps {
  onUserSelect: (s: string) => void;
  selectedUser: string;
}
