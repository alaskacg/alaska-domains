import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyDotCom from "@/components/WhyDotCom";
import Stats from "@/components/Stats";
import Statement from "@/components/Statement";
import Domains from "@/components/Domains";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WhyDotCom />
      <Stats />
      <Statement />
      <Domains />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
