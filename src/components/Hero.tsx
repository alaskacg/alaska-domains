import heroImage from "@/assets/hero-alaska.jpg";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(15, 23, 42, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(74, 222, 128, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      {/* Content */}
      <div className="container relative z-20 text-center px-4 animate-fade-in">
        <div className="inline-block mb-6 px-6 py-2 glass-morphism rounded-full">
          <span className="text-primary font-sans font-medium">Premium Digital Real Estate</span>
        </div>
        
        <h1 className="font-playfair font-black text-6xl md:text-8xl lg:text-9xl mb-8 text-gradient-primary drop-shadow-2xl tracking-tight">
          Alaska Domains
        </h1>
        
        <p className="font-sans text-xl md:text-2xl lg:text-3xl text-foreground/90 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
          Premium <span className="text-primary font-semibold">.com</span> Domains Inspired by the Last Frontier
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#domains" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-xl text-lg font-semibold hover-lift shadow-2xl font-sans group"
          >
            Explore Domains
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </a>
          
          <a 
            href="mailto:support@alaskadomains.com" 
            className="inline-flex items-center gap-2 glass-morphism px-8 py-4 rounded-xl text-lg font-semibold hover-lift shadow-2xl font-sans border border-primary/30"
          >
            Contact Us
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
