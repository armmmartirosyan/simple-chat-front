import React, { JSX, useEffect } from "react";
import { IMessage } from "../../models/shared-types";
import { IMessagesListProps } from "../../models/component-types";
import { Message } from "../Message/Message";
import { signallingProvider } from "../../providers/signalling-provider";
import { sharedUtils } from "../../utils/shared-utils";
import "./MessagesList.scss";

export function MessagesList({
  messages,
  selectedUser,
}: IMessagesListProps): JSX.Element {
  useEffect(() => {
    signallingProvider.doesNewMessageAdded.promise.then((message: IMessage) => {
      console.log({ message, selectedUser });

      if (selectedUser === message.from) {
        sharedUtils.scrollToTheBottom();
      }
    });
  }, [selectedUser]);

  return (
    <ul className="messages_list" id="messages-list">
      {messages.map((message: IMessage) => (
        <Message key={message.date + message.from} message={message} />
      ))}
    </ul>
  );
}
