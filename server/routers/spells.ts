import { PrismaClient } from '@prisma/client';

import { z } from 'zod';
import { procedure, router } from '../trpc';

const prisma = new PrismaClient();

export const spellsRouter = router({
  getSpells: procedure.query(async () => {
    return prisma.spell.findMany();
  }),
  addSpell: procedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        spellbookId: z.number(),
      }),
    )
    .mutation(async opts => {
      const { input } = opts;

      await prisma.spell.create({
        data: {
          title: input.title,
          description: input.description,
          image: input.image,
          spellbookId: input.spellbookId,
        },
      });
    }),
  deleteSpell: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async opts => {
      const { input } = opts;

      await prisma.spell.delete({
        where: { id: input.id },
      });
    }),
});
