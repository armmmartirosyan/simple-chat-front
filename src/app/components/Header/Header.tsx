import React, { JSX } from "react";
import { account } from "../../providers/account-provider";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

export function Header(): JSX.Element {
  const { username } = account.getUser();
  const navigate = useNavigate();

  const handleSignOut = (): void => {
    account.signOut();
    navigate("/sign-in");
  };

  return (
    <header className="header">
      <h1 className="header_username">{username}</h1>
      <p className="log_out" onClick={handleSignOut}>
        Sign out
      </p>
    </header>
  );
}
