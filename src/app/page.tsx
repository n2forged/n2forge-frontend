import Navbar from '@/components/navbar/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import ApproachSection from '@/components/landing/ApproachSection';
import SheetsSection from '@/components/landing/SheetsSection';
import RoadmapSection from '@/components/landing/RoadmapSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/footer/Footer';
import DottedField from '@/components/landing/DottedField';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070707]">
      <DottedField />
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, transparent 40%, rgba(7,7,7,.9) 100%)' }}
      />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ApproachSection />
      <SheetsSection />
      <RoadmapSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
