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

  return (
    <button className="wallet label">
      <img src="https://i.pravatar.cc/100" />
      <div className="info">
        <strong>0xA097...52D7</strong>
        <span>gregariously.eth</span>
      </div>
    </button>
  );
}
