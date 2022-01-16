import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useMountedState } from "react-use";
import Editor from "../../components/Editor";
import Record from "../../components/Record";
import ShareDialog from "../../components/ShareDialog";
import Stage from "../../components/Stage";
import Alpha from "../../models/Alpha";
import useMoralisObject from "../../utils/useMoralisObject";

export default function AlphaPage() {
  const { user } = useMoralis();
  const isMounted = useMountedState();
  const router = useRouter();
  const [stream, setStream] = useState<MediaStream>();
  const [share, setShare] = useState(false);

  const alpha = useMoralisObject<Alpha>("Alpha", router.query.id as string);

  useEffect(() => {
    if (!alpha || alpha.attributes.hlsUrl) return;

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(setStream);

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [alpha]);

  return (
    <div className="room">
      <header>
        <Link href="/">
          <a className="logo">
            <img src="/assets/mark-secondary-300.svg" alt="Speaking Alpha" />
          </a>
        </Link>

        <input
          defaultValue={alpha?.attributes.name}
          onBlur={(e) => {
            alpha?.set("name", e.target.value);
            alpha?.save();
          }}
          onKeyPress={(e) => e.key === "Enter" && (e.target as any).blur()}
          type="text"
        />

        <div className="actions">
          <button className="share act" onClick={() => setShare(true)}>
            <i className="bx bx-share"></i> Share
          </button>

          {alpha && stream && !alpha?.attributes.hlsUrl && (
            <Record alpha={alpha} stream={stream} />
          )}
        </div>
      </header>

      <main>
        {alpha && <Stage alpha={alpha} stream={stream} />}

        {alpha && (
          <div className="notes">
            {isMounted() && alpha.attributes.author.id === user?.id ? (
              <Editor alpha={alpha} />
            ) : (
              alpha.attributes.notes
            )}
          </div>
        )}
      </main>

      {alpha && share && (
        <ShareDialog alpha={alpha} onClose={() => setShare(false)} />
      )}
    </div>
  );
}
