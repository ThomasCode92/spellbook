import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { procedure, router } from '../trpc';

const prisma = new PrismaClient();

export const spellbooksRouter = router({
  getSpellbooks: procedure.query(async () => {
    return prisma.spellbook.findMany();
  }),
  addSpellbook: procedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async opts => {
      const { input } = opts;

      await prisma.spellbook.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    }),
  deleteSpellbook: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async opts => {
      const { input } = opts;

      await prisma.spellbook.delete({
        where: { id: input.id },
      });
    }),
});
