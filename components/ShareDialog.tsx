import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNFTBalances } from "react-moralis";
import Alpha, { AlphaAttributes } from "../models/Alpha";

export interface ShareDialogProps {
  alpha: Alpha;
  onClose?: () => void;
}

type Values = {
  addresses: string[];
  contracts: string[];
  newAddress: string;
};

export default function ShareDialog({ alpha, onClose }: ShareDialogProps) {
  const { data, getNFTBalances } = useNFTBalances();

  useEffect(() => {
    getNFTBalances();
  }, []);

  const url = `https://speaking-alpha.vercel.app/alpha/${alpha.id}`;

  const form = useForm<Values>({
    defaultValues: {
      addresses: alpha.attributes.addresses ?? [],
      contracts: alpha.attributes.contracts ?? [],
      newAddress: "",
    },
  });

  async function onSubmit(values: Values) {
    await alpha.save({
      addresses: values.addresses?.filter((a) => !!a),
      contracts: values.contracts?.filter((c) => !!c),
    });
    onClose?.();
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  } as any);

  return (
    <div className="dialog-container">
      <div className="dialog">
        <header>
          <h4>Share This Alpha</h4>
          <a href="#" onClick={onClose}>
            <i className="bx bx-x"></i>
          </a>
        </header>
        <div className="content">
          <div className="nfts">
            <h5>NFTs</h5>
            <p>Anyone holding these NFTs</p>
            <ul>
              {data?.result?.map((nft) => (
                <li>
                  <label>
                    <input type="checkbox" />{" "}
                    {nft.name ??
                      nft.symbol ??
                      nft.token_address?.substring(0, 15)}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="wallets">
            <h5>Wallets</h5>
            <p>These specific wallets</p>

            <ul>
              {fields?.map((address, index) => (
                <li key={index}>
                  <input
                    type="text"
                    {...form.register(`addresses.${index}`)}
                    disabled
                  />
                  <a href="#" onClick={() => remove(index)}>
                    <i className="bx bx-trash"></i>
                  </a>
                </li>
              ))}

              <li>
                <input
                  type="text"
                  {...form.register("newAddress")}
                  placeholder="enter wallet address"
                />
                <a
                  href="#"
                  onClick={() => {
                    append(form.getValues("newAddress"));
                    form.setValue("newAddress", "");
                  }}
                >
                  <i className="bx bx-plus-circle"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <footer>
          <div className="actions">
            <button onClick={form.handleSubmit(onSubmit)}>Save Settings</button>
            <a href="#" onClick={onClose}>
              Cancel
            </a>
          </div>

          <div className="url">
            <input type="text" value={url} />
            <a
              href="#"
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
            >
              <i className="bx bx-copy"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
