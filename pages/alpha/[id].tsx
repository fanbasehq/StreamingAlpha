import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useMountedState } from "react-use";
import Editor from "../../components/Editor";
import Record from "../../components/Record";
import Stage from "../../components/Stage";
import Alpha from "../../models/Alpha";
import useMoralisObject from "../../utils/useMoralisObject";

export default function AlphaPage() {
  const isMounted = useMountedState();
  const router = useRouter();
  const stream = useRef<MediaStream>();

  const alpha = useMoralisObject<Alpha>("Alpha", router.query.id as string);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((media) => (stream.current = media));

    return () => {
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="room">
      <header>
        <Link href="/">
          <a className="logo">
            <img src="/assets/mark-secondary-300.svg" alt="Speaking Alpha" />
          </a>
        </Link>

        <input
          onBlur={(e) => {
            alpha.set("name", e.target.value);
            alpha.save();
          }}
          onKeyPress={(e) => e.key === "Enter" && (e.target as any).blur()}
          type="text"
          placeholder={alpha?.attributes.name}
        />

        <div className="actions">
          <button className="share act">
            <i className="bx bx-share"></i> Share
          </button>

          <Record alpha={alpha} stream={stream} />
        </div>
      </header>

      <main>
        <Stage stream={stream} />

        <div className="notes">
          {isMounted() && alpha && <Editor name={`alpha_${alpha.id}`} />}
        </div>
      </main>
    </div>
  );
}
