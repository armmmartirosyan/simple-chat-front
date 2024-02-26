import React, { useCallback, useEffect, useState, JSX } from "react";
import { signallingProvider } from "../../providers/signalling-provider";
import useMessaging from "../../hooks/use-messaging";
import { MessagesList } from "../../components/MessagesList";
import { MessageInput } from "../../components/MessageInput";
import { Header } from "../../components/Header";
import { OnlineUsers } from "../../components/OnlineUsers";
import { EmptyMessagesList } from "../../components/EmptyMessageList";
import { EVENTS } from "../../constants/global-constants";
import withSocketProvider from "../../HOCs/WithSocketProvider";
import requireAuth from "../../HOCs/RequireAuth";
import "./Chat.scss";

function Chat(): JSX.Element {
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, sendMessage] = useMessaging(selectedUser);

  const handleSelectUser = useCallback(
    (username: string) => {
      if (selectedUser !== username) {
        setSelectedUser(username);
      }
    },
    [selectedUser]
  );

  useEffect(() => {
    const userDisconnectedOff = signallingProvider.emitter.on(
      EVENTS.USER_DISCONNECTED,
      userDisconnected
    );

    return userDisconnectedOff;
  }, [selectedUser]);

  const userDisconnected = (username: string): void => {
    if (selectedUser === username) {
      setSelectedUser("");
    }
  };

  return (
    <div className="chat_wrapper">
      <Header />
      <div className="chat_body">
        {!!selectedUser ? (
          <>
            <MessagesList messages={messages} selectedUser={selectedUser} />
            <MessageInput sendMessage={sendMessage} />
          </>
        ) : (
          <EmptyMessagesList />
        )}
      </div>
      <div className="chat_online_users">
        <OnlineUsers
          onUserSelect={handleSelectUser}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
}

const ChatWithSocket = withSocketProvider(Chat);

export default requireAuth(ChatWithSocket);
