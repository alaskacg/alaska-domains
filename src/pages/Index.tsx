import Hero from "@/components/Hero";
import WhyDotCom from "@/components/WhyDotCom";
import Stats from "@/components/Stats";
import Statement from "@/components/Statement";
import Domains from "@/components/Domains";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyDotCom />
      <Stats />
      <Statement />
      <Domains />
      <Footer />
    </main>
  );
};

export default Index;
