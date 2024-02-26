import { useCallback, useEffect, useState } from "react";
import { signallingProvider } from "../providers/signalling-provider";
import { IMessage, SendMessage } from "../models/shared-types";
import { SIGNAL_MESSAGE_TYPES } from "../constants/signal-constants";
import { EVENTS } from "../constants/global-constants";
import { messageUtils } from "../utils/message-utils";
import { account } from "../providers/account-provider";

export default function useMessaging(
  selectedUser: string
): [IMessage[], SendMessage] {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const loadMessagesOff = signallingProvider.emitter.on(
      EVENTS.LOAD_MESSAGES,
      handleLoadMessages
    );
    const newMessageOff = signallingProvider.emitter.on(
      EVENTS.NEW_MESSAGE,
      handleNewMessage
    );
    const userConnectedOff = signallingProvider.emitter.on(
      EVENTS.ON_CONNECT,
      handleConnect
    );

    return () => {
      loadMessagesOff();
      newMessageOff();
      userConnectedOff();
    };
  }, []);

  useEffect(() => {
    if (isConnected && selectedUser) {
      signallingProvider.sendMessage(
        SIGNAL_MESSAGE_TYPES.LOAD_MESSAGES,
        selectedUser
      );
    }
  }, [selectedUser, isConnected]);

  const handleLoadMessages = (messages: IMessage[]) => {
    setMessages(messages);
  };

  const handleNewMessage = (message: IMessage) => {
    setMessages((prev) => [...prev, message]);

    signallingProvider.doesNewMessageAdded.resolve(message);
  };

  const handleConnect = (): void => {
    setIsConnected(true);
  };

  const handleSendMessage = useCallback(
    (message: string) => {
      if (!selectedUser) return;

      const { username } = account.getUser();
      const newMessage = messageUtils.creatMessage(
        message,
        username,
        selectedUser
      );

      signallingProvider.sendMessage(
        SIGNAL_MESSAGE_TYPES.NEW_MESSAGE,
        newMessage
      );

      setMessages((prev) => [...prev, newMessage]);
    },
    [selectedUser]
  );

  return [messages, handleSendMessage];
}
