import { Client } from "@livepeer/webrtmp-sdk";
import { MutableRefObject } from "react";
import Alpha from "../models/Alpha";

export default function Record({
  alpha,
  stream,
}: {
  alpha: Alpha;
  stream: MutableRefObject<MediaStream>;
}) {
  async function start() {
    const livestream = await fetch(`/api/createStream?id=${alpha.id}`).then(
      (res) => res.json()
    );

    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!livestream.streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    const session = client.cast(stream.current, livestream.streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });
  }

  return (
    <button className="rec act" onClick={start}>
      <i className="bx bx-circle"></i> Record
    </button>
  );
}
