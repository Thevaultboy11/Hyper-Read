import { getServerSession } from "next-auth";
import { Options } from "./[...nextauth]";
export default async function checkSession(req, res) {
  const session = await getServerSession(req, res, Options);

  if (session) {
    res
      .status(200)
      .json({ message: "User is authenticated", user: session.user });
  } else {
    res.status(401).json({ message: "User is not authenticated" });
  }
}
