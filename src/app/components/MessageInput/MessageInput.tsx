import React, { JSX } from "react";
import { IMessageInputProps } from "../../models/component-types";
import "./MessageInput.scss";

export function MessageInput({ sendMessage }: IMessageInputProps): JSX.Element {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!message) return;

    sendMessage(message);
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="message_form">
      <input
        type="text"
        className="message_input"
        value={message}
        onChange={handleChange}
      />
      <button className="message_send_btn">Send</button>
    </form>
  );
}
