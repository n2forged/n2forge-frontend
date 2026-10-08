import Navbar from '@/components/navbar/Navbar';
import Atmosphere from '@/components/landing/Atmosphere';
import HeroSection from '@/components/landing/HeroSection';
import ApproachSection from '@/components/landing/ApproachSection';
import SheetsSection from '@/components/landing/SheetsSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: '#0B0D12' }}>
      <Atmosphere />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <ApproachSection />
        <SheetsSection />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
