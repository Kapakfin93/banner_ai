import { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router.js";
import { createContext } from "./context.js";
import { env } from "./lib/env.js";

const app = new Hono<{ Bindings: HttpBindings }>();

app.get("/api/test-hono", (c) => c.json({ ok: true }));
app.use("/api/trpc/*", async (c) => {
  try {
    const method = c.req.method;
    const headers = new Headers(c.req.raw.headers);
    let body: string | undefined = undefined;

    if (method === "POST" || method === "PUT" || method === "PATCH") {
      body = await c.req.text();
    }

    const newReq = new Request(c.req.raw.url, {
      method,
      headers,
      body,
    });

    return await fetchRequestHandler({
      endpoint: "/api/trpc",
      req: newReq,
      router: appRouter,
      createContext,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("tRPC Handler Exception caught:", error);
    return c.json({
      error: {
        message: message || "Internal Server Error",
        code: -32603,
      }
    }, 500);
  }
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction && !process.env.VERCEL) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite.js");
  serveStaticFiles(app);

  const port = Number.parseInt(process.env.PORT || "3000", 10);
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
