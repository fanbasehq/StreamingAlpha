import type { NextApiRequest, NextApiResponse } from "next";

export default async function createStream(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stream = await fetch(`https://livepeer.com/api/stream`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `alpha_${req.query.id}`,
      profiles: [
        {
          name: "720p",
          bitrate: 2000000,
          fps: 30,
          width: 1280,
          height: 720,
        },
        {
          name: "480p",
          bitrate: 1000000,
          fps: 30,
          width: 854,
          height: 480,
        },
        {
          name: "360p",
          bitrate: 500000,
          fps: 30,
          width: 640,
          height: 360,
        },
      ],
    }),
  }).then((res) => {
    console.log(res);
    res.text();
  });

  console.log(stream);

  res.send(stream);
}
