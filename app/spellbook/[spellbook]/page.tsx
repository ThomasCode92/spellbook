'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { trpc } from '@/server/client';

type SpellbookPageProps = {
  params: { spellbook: string };
};

export default function SpellbookPage({ params }: SpellbookPageProps) {
  const spellbook = trpc.spellbooks.getSpellbookById.useQuery({
    id: Number(params.spellbook),
  });

  return (
    <Table>
      <TableCaption>Spells from {spellbook.data?.title}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {spellbook.data?.spells.map(spell => (
          <TableRow key={spell.id}>
            <TableCell className="font-medium">{spell.title}</TableCell>
            <TableCell>{spell.description}</TableCell>
            <TableCell>
              {spell.image && (
                <Image src={spell.image} alt={`image of ${spell.title}`} />
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
