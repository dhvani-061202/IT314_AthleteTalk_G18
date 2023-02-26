export default process.env.NODE_ENV === "localhost:3000"
  ? "http://localhost:3000"
  : "";
