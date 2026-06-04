import { createRouter, publicQuery } from "./middleware.js";
import { bannerRouter } from "./routers/banner.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  banner: bannerRouter,
});

export type AppRouter = typeof appRouter;
