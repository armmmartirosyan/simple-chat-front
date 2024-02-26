import { v4 as uuid } from "uuid";

export interface IUser {
  username: string;
}

export interface IMessage {
  id: ReturnType<typeof uuid>;
  message: string;
  date: Date;
  from: any;
  to: any;
}

export type SendMessage = (message: string) => void;

export interface IDefer<T> {
  promise: Promise<T> | null;
  reject: (err?: Error) => void;
  resolve: (value?: T) => void;
  reset: VoidFunction;
}
