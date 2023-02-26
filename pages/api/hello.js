import clientPromies from "../../lib/mongodb";
import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ err: "Something broke!" });
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ err: "Page is not found" });
  },
});

handler.get(async (req, res) => {
  res.status(200).json({ name: "John Doe" });
});

export default handler;
