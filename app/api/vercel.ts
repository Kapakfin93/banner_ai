import { handle } from "hono/vercel";
import app from "./boot.js";

export const config = {
  runtime: "edge",
};

export default handle(app);
