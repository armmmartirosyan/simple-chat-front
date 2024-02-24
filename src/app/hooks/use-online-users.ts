import React, { useEffect } from "react";
import { signallingProvider } from "../providers/signalling-provider";
import { EVENTS } from "../constants/global-constants";

export default function useOnlineUsers(): string[] {
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([]);

  useEffect(() => {
    const userConnectedOff = signallingProvider.emitter.on(
      EVENTS.ON_CONNECT,
      handleConnected
    );

    const userDisconnectedOff = signallingProvider.emitter.on(
      EVENTS.USER_DISCONNECTED,
      userDisconnected
    );

    const newUserConnectedOff = signallingProvider.emitter.on(
      EVENTS.NEW_USER_CONNECTED,
      handleNewUserConnected
    );

    return () => {
      userDisconnectedOff();
      userConnectedOff();
      newUserConnectedOff();
    };
  }, []);

  const handleNewUserConnected = (username: string) => {
    setOnlineUsers((prevState) => [...prevState, username]);
  };

  const userDisconnected = (username: string) => {
    setOnlineUsers((prevState) =>
      prevState.filter((user) => user !== username)
    );
  };

  const handleConnected = (users: string[]) => {
    setOnlineUsers((prevState) => {
      const newUsersList = new Set([...prevState, ...users]);

      return Array.from(newUsersList);
    });
  };

  return onlineUsers;
}
