'use client';

type SpellbookPageProps = {
  params: { spellbook: string };
};

export default function SpellbookPage({ params }: SpellbookPageProps) {
  return <div>{params.spellbook}</div>;
}
