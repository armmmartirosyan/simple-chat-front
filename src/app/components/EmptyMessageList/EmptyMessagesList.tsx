import React, { JSX } from "react";
import "./EmptyMessagesList.scss";

export function EmptyMessagesList(): JSX.Element {
  return (
    <div className="empty_message_list">
      <p className="empty_message_list_text">Select a user to chat with.</p>
    </div>
  );
}
