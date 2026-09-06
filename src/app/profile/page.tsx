import Navbar from '@/components/navbar/Navbar';
import ProfileView from '@/components/profile/ProfileView';

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen bg-[#070707]">
      <Navbar />
      <ProfileView />
    </main>
  );
}
