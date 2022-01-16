import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export default function useMoralisObject<T extends Moralis.Object>(
  className: string,
  id: string
): T | undefined {
  const [object, setObject] = useState<T>();

  const { isInitialized } = useMoralis();

  useEffect(() => {
    if (!isInitialized) return;

    const query = new Moralis.Query<T>(className);
    query.get(id).then(setObject).catch(console.error);
  }, [isInitialized]);

  return object;
}
