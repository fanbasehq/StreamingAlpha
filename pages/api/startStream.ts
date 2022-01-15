import type { NextApiRequest, NextApiResponse } from "next";

export default async function startStream(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query.name as string;

  // let stream = await getStream(name);

  // if (!stream)
  const stream = await createStream(name);

  // stream = await getStream(name);

  console.log(stream);

  res.send(stream);
}

async function getStream(name: string) {
  return fetch(
    `https://livepeer.com/api/stream?streamsonly=1&filters=[{"name":"${name}"}]`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}

async function createStream(name: string) {
  return fetch(`https://livepeer.com/api/stream`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
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
  }).then((res) => res.json());
}
