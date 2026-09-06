import Navbar from '@/components/navbar/Navbar';
import SheetView from '@/components/sheet/SheetView';

export default async function SheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="relative min-h-screen bg-[#070707]">
      <Navbar />
      <SheetView slug={slug} />
    </main>
  );
}
