import React, { useMemo, JSX } from "react";
import { IMessage } from "../../models/shared-types";
import { account } from "../../providers/account-provider";
import "./Message.scss";

export function Message({ message }: { message: IMessage }): JSX.Element {
  const { username } = account.getUser();

  const messagePositionClass = useMemo(() => {
    if (message.from === username) {
      return "message_from_me";
    }

    return "";
  }, [message, username]);

  return (
    <li className={`message ${messagePositionClass}`} key={message.id}>
      <figure className="message_user_image" />
      <div className="message_body">
        <h2 className="message_username">{message.from}</h2>
        <p className="message_text">{message.message}</p>
      </div>
    </li>
  );
}
