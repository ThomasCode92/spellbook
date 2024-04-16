import { spellbooksRouter } from './routers/spellbooks';
import { spellsRouter } from './routers/spells';
import { router } from './trpc';

export const appRouter = router({
  spellbooks: spellbooksRouter,
  spells: spellsRouter,
});

export type AppRouter = typeof appRouter;
