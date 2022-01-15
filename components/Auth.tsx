import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import Davatar from "@davatar/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user, authenticate, logout, web3 } = useMoralis();

  async function login() {
    await authenticate({ signingMessage: "Log in using Moralis" });
  }

  {
    /* <code>{JSON.stringify(user.attributes)}</code>
      <button onClick={logout}>Logout {user.get("ethAddress")}</button> */
  }

  return (
    <main className="home">
      <h1>Speaking Alpha</h1>
      <p className="subtitle">Got some alpha? Share it!</p>

      <button className="label bigger" onClick={login}>
        <i className="bx bx-wallet-alt"></i> Connect Wallet
      </button>

      <Davatar
        size={24}
        // address={user.get("ethAddress")}
        address="0xA097Ef0F02Ad73B6425Fee3809104B5Ac5C452D7"
        // provider={provider} // optional
        // graphApiKey={apiKey} // optional
      />
    </main>
  );
}
