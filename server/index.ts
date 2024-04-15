import { spellBooksRouter } from './routers/spellbooks';
import { spellsRouter } from './routers/spells';
import { router } from './trpc';

export const appRouter = router({
  spellbooks: spellBooksRouter,
  spells: spellsRouter,
});

export type AppRouter = typeof appRouter;
