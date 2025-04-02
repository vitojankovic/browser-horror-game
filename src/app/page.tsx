import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-8 text-red-600">WHISPERS IN THE DARK</h1>
        <p className="text-xl mb-12">
          Enter a world where your choices determine your fate. 
          This simple text-based horror experience responds to your commands.
          Dare to explore?
        </p>
        <Link 
          href="/game" 
          className="inline-block px-8 py-4 bg-red-700 hover:bg-red-800 text-white font-bold text-xl rounded-md transition-colors"
        >
          BEGIN THE NIGHTMARE
        </Link>
      </div>
    </main>
  );
}
