import Davatar from "@davatar/react";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export default function UserMenu() {
  const { user, logout } = useMoralis();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (!user) return;
    Moralis.Web3API.resolve.resolveAddress().then((res) => setName(res.name));
  }, [user]);

  /* <code>{JSON.stringify(user.attributes)}</code>
  <button onClick={logout}>Logout {user.get("ethAddress")}</button> */

  if (!user) return null;

  const address = user.get("ethAddress") as string;

  return (
    <button className="wallet label" onClick={logout}>
      <Davatar size={24} address={address} />

      <div className="info">
        <strong>
          {address.substring(0, 6)}...{address.substring(address.length - 4)}
        </strong>

        <span>{name}</span>
      </div>
    </button>
  );
}
