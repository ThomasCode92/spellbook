import { procedure, router } from '../trpc';

export const spellsRouter = router({
  getSpells: procedure.query(() => {
    return [{ title: 'Fireball' }];
  }),
});
