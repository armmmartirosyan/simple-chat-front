import React, { JSX } from "react";
import { IMessage } from "../../models/shared-types";
import { IMessagesListProps } from "../../models/component-types";
import { Message } from "../Message/Message";
import "./MessagesList.scss";

export function MessagesList({ messages }: IMessagesListProps): JSX.Element {
  return (
    <ul className="messages_list">
      {messages.map((message: IMessage) => (
        <Message key={message.date + message.from} message={message} />
      ))}
    </ul>
  );
}
