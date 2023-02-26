export default process.env.SERVER === "localhost:3000"
  ? "http://localhost:3000"
  : "https://athlete-talk.vercel.app";
