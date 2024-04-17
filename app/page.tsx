import Spellbook from '@/components/Spellbook/Spellbook';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 gap-5">
        <Spellbook />
      </div>
    </main>
  );
}
