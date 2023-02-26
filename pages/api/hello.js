import clientPromies from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromies;
  const db = client.db("test");
  const collection = db.collection("test");
  const result = await collection.find({}).toArray();
  res.status(200).json(result);
}
