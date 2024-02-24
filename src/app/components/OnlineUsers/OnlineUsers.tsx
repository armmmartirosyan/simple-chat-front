import React, { JSX } from "react";
import useOnlineUsers from "../../hooks/use-online-users";
import { v4 as uuid } from "uuid";
import { IOnlineUsersProps } from "../../models/component-types";
import "./OnlineUsers.scss";

export function OnlineUsers({
  onUserSelect,
  selectedUser,
}: IOnlineUsersProps): JSX.Element {
  const onlineUsers: string[] = useOnlineUsers();

  const selectedClass = (tempUser: string): string => {
    return selectedUser === tempUser ? "selected" : "";
  };

  return (
    <>
      {!!onlineUsers.length && (
        <ul className="users_list">
          {onlineUsers.map((user) => (
            <li
              onClick={() => onUserSelect(user)}
              className={`user ${selectedClass(user)}`}
              key={uuid()}
            >
              {user}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
