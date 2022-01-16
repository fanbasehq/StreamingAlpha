import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import Alpha from "../models/Alpha";

export interface StageProps {
  alpha: Alpha;
  stream?: MediaStream;
}

export default function Stage({ alpha, stream }: StageProps) {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!stream || !videoEl.current) return;

    videoEl.current.volume = 0;
    videoEl.current.srcObject = stream;
    videoEl.current.play();
  }, [stream]);

  return (
    <div className="stage">
      {alpha.attributes.hlsUrl === "processing" ? (
        <div>Video is being processed...</div>
      ) : alpha.attributes.hlsUrl ? (
        <ReactPlayer controls playsinline url={alpha.attributes.hlsUrl} />
      ) : (
        <video className="stream-video" ref={videoEl} />
      )}
    </div>
  );
}
