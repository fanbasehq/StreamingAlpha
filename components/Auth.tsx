import React from "react";
import { useMoralis } from "react-moralis";

export interface AuthProps {
  children: React.ReactElement;
}

export default function Auth({ children }: AuthProps) {
  const { user, authenticate } = useMoralis();

  async function login() {
    await authenticate({ signingMessage: "Log in using Moralis" });
  }

  {
    /* <code>{JSON.stringify(user.attributes)}</code>
      <button onClick={logout}>Logout {user.get("ethAddress")}</button> */
  }

  if (user) return children;

  return (
    <main className="auth">
      <img className="auth-logo" src="/assets/mark-primary.svg" />

      <h1>Speaking Alpha</h1>
      <p className="subtitle">Got some alpha? Share it!</p>

      <button className="label bigger" onClick={login}>
        <i className="bx bx-wallet-alt"></i> Connect Wallet
      </button>
    </main>
  );
}
