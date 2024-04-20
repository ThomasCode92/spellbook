'use client';

import Image from 'next/image';
import { FormEvent, Fragment, useRef, useState } from 'react';

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

  const fileRef = useRef<HTMLInputElement>(null);

  const spellbook = trpc.spellbooks.getSpellbookById.useQuery({
    id: Number(params.spellbook),
  });

  const addSpell = trpc.spells.addSpell.useMutation();
  const deleteSpell = trpc.spells.deleteSpell.useMutation();

  function addNewSpell(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!spellbook.data) return;

    const files = fileRef.current?.files;
    let file: File | undefined;

    if (files && files.length > 0) {
      const formData = new FormData();

      file = files[0];
      formData.append('files', file);

      fetch('/api/file', { method: 'POST', body: formData });
    }

    addSpell.mutate(
      {
        title,
        description,
        image: file ? `/public/${file.name}` : null,
        spellbookId: spellbook.data.id,
      },
      { onSettled: spellbook.refetch },
    );

    setTitle('');
    setDescription('');
  }

  const deleteSpellById = (id: number) => {
    deleteSpell.mutate({ id }, { onSettled: spellbook.refetch });
  };

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
            <form
              className="flex flex-col gap-3"
              onSubmit={event => addNewSpell(event)}
            >
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
              <p>Image:</p>
              <Input type="file" ref={fileRef} />
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
                <Button onClick={() => deleteSpellById(spell.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
