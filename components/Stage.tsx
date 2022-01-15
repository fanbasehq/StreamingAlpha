import { MutableRefObject, useEffect, useRef } from "react";

export default function Stage({
  stream,
}: {
  stream: MutableRefObject<MediaStream>;
}) {
  const videoEl = useRef(null);

  useEffect(() => {
    (async () => {
      videoEl.current.volume = 0;
      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })();
  });

  return (
    <div className="stage">
      <video className="stream-video" ref={videoEl} />
    </div>
  );
}
