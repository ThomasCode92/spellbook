'use client';

import { Fragment } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { trpc } from '@/server/client';

export default function Spellbook() {
  const spellbooks = trpc.spellbooks.getSpellbooks.useQuery();

  return (
    <Fragment>
      {spellbooks.data?.map(spellbook => (
        <Card key={spellbook.id}>
          <CardHeader>
            <CardTitle>{spellbook.title}</CardTitle>
            <CardDescription>{spellbook.description}</CardDescription>
          </CardHeader>
          <CardContent>Spells...</CardContent>
        </Card>
      ))}
    </Fragment>
  );
}
