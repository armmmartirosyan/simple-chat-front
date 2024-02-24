import React, { FormEvent, JSX, useCallback, useState } from "react";
import { account } from "../../providers/account-provider";
import { useNavigate } from "react-router-dom";
import notRequireAuth from "../../HOCs/NotRequireAuth";
import "./SignIn.scss";

function SignIn(): JSX.Element {
  const [username, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();

      if (!username || !password) return;

      const isSuccess = account.signIn(username, password);

      if (isSuccess) {
        return navigate("/");
      }

      alert("Invalid username or password!");
    },
    [username, password]
  );

  return (
    <div className="login">
      <form className="login_form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="login_input"
          placeholder="SignIn"
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          className="login_input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login_submit" disabled={!username || !password}>
          SignIn
        </button>
      </form>
    </div>
  );
}

export default notRequireAuth(SignIn);
