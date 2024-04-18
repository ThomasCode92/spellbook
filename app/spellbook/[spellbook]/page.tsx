'use client';

import Image from 'next/image';
import { Fragment, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const spellbook = trpc.spellbooks.getSpellbookById.useQuery({
    id: Number(params.spellbook),
  });

  function addNewSpell() {}

  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add spell</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your spell</DialogTitle>
            <DialogDescription>
              Add a powerful spell to {spellbook.data?.title}.
            </DialogDescription>
            <form className="flex flex-col gap-3" onSubmit={addNewSpell}>
              <p>Title:</p>
              <Input
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
              <p>Description:</p>
              <Input
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
              <Button>Save</Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
    </Fragment>
  );
}
