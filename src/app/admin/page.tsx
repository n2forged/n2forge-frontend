import Navbar from '@/components/navbar/Navbar';
import AdminView from '@/components/admin/AdminView';

export default function AdminPage() {
  return (
    <main className="relative min-h-screen bg-[#070707]">
      <Navbar />
      <AdminView />
    </main>
  );
}
