import { Socket, io } from "socket.io-client";
import { SIGNAL_MESSAGE_TYPES } from "../constants/signal-constants";
import { IMessage } from "../models/shared-types";
import EventEmitter from "../utils/event-emitter";
import { EVENTS } from "../constants/global-constants";
import { account } from "./account-provider";

class SignallingProvider {
  public socket: Socket | null = null;
  public emitter = new EventEmitter();

  public init(): void {
    const { username } = account.getUser();

    this.socket = io("http://localhost:3004", {
      query: {
        username,
      },
    });

    this.socket.on(SIGNAL_MESSAGE_TYPES.NEW_MESSAGE, this.onNewMessage);
    this.socket.on(SIGNAL_MESSAGE_TYPES.LOAD_MESSAGES, this.onLoadMessages);
    this.socket.on(SIGNAL_MESSAGE_TYPES.ON_CONNECT, this.onUserConnected);
    this.socket.on(
      SIGNAL_MESSAGE_TYPES.NEW_USER_CONNECTED,
      this.newUserConnected
    );
    this.socket.on(
      SIGNAL_MESSAGE_TYPES.USER_DISCONNECTED,
      this.userDisconnected
    );
  }

  public sendMessage(type: string, message: IMessage | string): void {
    if (!this.socket) return;

    this.socket.emit(type, message);
  }

  public disconnect = (): void => {
    if (!this.socket) return;

    this.socket.disconnect();
  };

  private onNewMessage = (message: IMessage): void => {
    if (!this.emitter) return;

    this.emitter.emit(EVENTS.NEW_MESSAGE, message);
  };

  private onLoadMessages = (messages: IMessage[]): void => {
    if (!this.emitter) return;

    this.emitter.emit(EVENTS.LOAD_MESSAGES, messages);
  };

  private onUserConnected = (socketId: string): void => {
    if (!this.emitter) return;

    this.emitter.emit(EVENTS.ON_CONNECT, socketId);
  };

  private newUserConnected = (username: string): void => {
    if (!this.emitter) return;

    this.emitter.emit(EVENTS.NEW_USER_CONNECTED, username);
  };

  private userDisconnected = (username: string): void => {
    if (!this.emitter) return;

    this.emitter.emit(EVENTS.USER_DISCONNECTED, username);
  };
}

export const signallingProvider = new SignallingProvider();
