'use client';

import { trpc } from '@/server/client';

export default function Home() {
  const spellbooks = trpc.spellbooks.getSpellbooks.useQuery();

  return (
    <div>
      {spellbooks.data?.map(spellbook => (
        <div key={spellbook.title}>{spellbook.title}</div>
      ))}
    </div>
  );
}
