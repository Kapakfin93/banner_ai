import { createRouter, publicQuery } from "./middleware";
import { bannerRouter } from "./routers/banner";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  banner: bannerRouter,
});

export type AppRouter = typeof appRouter;
