import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();
app.use("*", logger());

app.get("/ping", (c) => {
  return c.json({ message: "pong" });
});

export default app;
