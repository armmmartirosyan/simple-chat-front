import { IMessage } from "./shared-types";

export interface IMessagesListProps {
  messages: IMessage[];
}

export interface IMessageInputProps {
  sendMessage: (message: string) => void;
}

export interface IOnlineUsersProps {
  onUserSelect: (s: string) => void;
  selectedUser: string;
}
