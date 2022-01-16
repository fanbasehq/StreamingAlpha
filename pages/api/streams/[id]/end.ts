import type { NextApiRequest, NextApiResponse } from "next";

export default async function endStream(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  const sessions = await fetch(
    `https://livepeer.com/api/stream/${id}/sessions?record=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  const session = sessions[0];

  if (!session) return res.status(404).send("No active session found");

  await fetch(`https://livepeer.com/api/stream/${session.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      suspended: true,
    }),
  });

  res.send(session);
}
