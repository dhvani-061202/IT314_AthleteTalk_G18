import dbConnect from "./../../lib/mongoose";

export default async function handler(req, res) {
  await dbConnect();

  res.status(200).json({ message: "DB connected🚀" });
}
