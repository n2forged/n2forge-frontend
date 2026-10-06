import Navbar from '@/components/navbar/Navbar';
import SheetView from '@/components/sheet/SheetView';
import GlassBackdrop from '@/components/sheet/GlassBackdrop';

export default async function SheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="relative min-h-screen" style={{ backgroundColor: '#0D0F14' }}>
      <GlassBackdrop />
      <Navbar />
      <SheetView slug={slug} />
    </main>
  );
}
