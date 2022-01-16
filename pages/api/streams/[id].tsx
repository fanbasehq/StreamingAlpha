import type { NextApiRequest, NextApiResponse } from "next";

export default async function getStream(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  const stream = await fetch(`https://livepeer.com/api/stream/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (stream) res.send(stream);
  else res.status(404);
}
