import { spellBooksRouter } from './routers/spellbooks';
import { router } from './trpc';

export const appRouter = router({
  spellbooks: spellBooksRouter,
});

export type AppRouter = typeof appRouter;
