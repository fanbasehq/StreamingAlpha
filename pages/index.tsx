import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { useMoralisQuery } from "react-moralis";
import Alpha from "../models/Alpha";

export default function HomePage() {
  const router = useRouter();
  const { data, isLoading } = useMoralisQuery("Alpha");

  async function createAlpha() {
    const alpha = new Alpha({
      name: `Alpha ${Math.random().toString(36).substring(2, 11)}`,
    });
    await alpha.save();
    router.push(`alpha/${alpha.id}`);
  }

  return (
    <div className="index">
      <header>
        <img
          src="/assets/logo-secondary-300.svg"
          alt="Speaking Alpha"
          className="logo"
        />
      </header>
      <main>
        <div className="record">
          <a onClick={createAlpha}>click to record your alpha</a>
        </div>

        <h3>Previous Alphas</h3>

        <ul className="alphas">
          {data.map((alpha) => (
            <Link key={alpha.id} href={`/alpha/${alpha.id}`}>
              <a>
                <li>
                  <div className="thumb"></div>

                  <div className="info">
                    <h4>{alpha.attributes.name}</h4>
                    <p className="meta">
                      {format(alpha.createdAt, "PPP	p")}
                      {/* • 12 minutes */}
                    </p>
                  </div>

                  {/* <div className="actions">
                    <button className="share button">Share</button>
                  </div> */}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </main>
    </div>
  );
}
