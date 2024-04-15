import { z } from 'zod';
import { procedure, router } from '../trpc';

export const spellBooksRouter = router({
  getSpellbooks: procedure.query(() => {
    return [
      { title: 'Spellbook 1', spells: [] },
      { title: 'Spellbook 2', spells: [] },
    ];
  }),
  addSpell: procedure.input(z.object({ title: z.string() })).mutation(opts => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { input } = opts;

    // TODO: call prisma add Spellbook method
  }),
});
