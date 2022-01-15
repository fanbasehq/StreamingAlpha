import { CastSession, Client } from "@livepeer/webrtmp-sdk";
import { MutableRefObject, useRef, useState } from "react";
import Alpha from "../models/Alpha";

export default function Record({
  alpha,
  stream,
}: {
  alpha: Alpha;
  stream: MutableRefObject<MediaStream>;
}) {
  const [recording, setRecording] = useState(false);
  const session = useRef<CastSession>();

  async function start() {
    const livestream = await fetch(
      `/api/startStream?name=alpha_${alpha.id}`
    ).then((res) => res.json());

    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!livestream.streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    session.current = client.cast(stream.current, livestream.streamKey);

    session.current.on("open", () => {
      console.log("Stream started.");
    });

    session.current.on("close", () => {
      console.log("Stream stopped.");
    });

    session.current.on("error", (err) => {
      console.log("Stream error.", err.message);
    });

    setRecording(true);
  }

  function stop() {
    session.current?.close();
    setRecording(false);
  }

  return recording ? (
    <button className="rec act" onClick={stop}>
      <i className="bx bx-stop-circle"></i> Stop
    </button>
  ) : (
    <button className="rec act" onClick={start}>
      <i className="bx bxs-circle"></i> Record
    </button>
  );
}
