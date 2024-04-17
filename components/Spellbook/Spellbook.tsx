'use client';

import Image from 'next/image';
import { Fragment, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import plus from '@/icons/plus.svg';

import { trpc } from '@/server/client';

export default function Spellbook() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const spellbooks = trpc.spellbooks.getSpellbooks.useQuery();
  const addSpellbook = trpc.spellbooks.addSpellbook.useMutation();

  function addNewSpellbook() {
    addSpellbook.mutate({ title, description });

    setTitle('');
    setDescription('');
  }

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
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex cursor-pointer items-center justify-center">
            <Image src={plus} alt="plus icon" />
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your spellbook</DialogTitle>
            <DialogDescription>
              Create your collection of spells.
            </DialogDescription>
            <form className="flex flex-col gap-3" onSubmit={addNewSpellbook}>
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
    </Fragment>
  );
}
