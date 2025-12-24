import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ModulesSection from "@/components/sections/ModulesSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dar Lifegame OS - Transform Your Life Into An Epic Game</title>
        <meta
          name="description"
          content="Dar Lifegame OS adalah sistem operasi kehidupan yang mengubah setiap momen menjadi quest, setiap pencapaian menjadi achievement, dan hidupmu menjadi game epik."
        />
        <meta
          name="keywords"
          content="lifegame, life game os, productivity, gamification, personal development, life operating system"
        />
        <meta property="og:title" content="Dar Lifegame OS - Transform Your Life Into An Epic Game" />
        <meta
          property="og:description"
          content="Sistem operasi kehidupan yang mengubah hidupmu menjadi game epik yang tak terlupakan."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://darlifegameos.com" />
      </Helmet>

      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ModulesSection />
          <PhilosophySection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
