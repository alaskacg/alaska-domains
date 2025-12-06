import heroImage from "@/assets/hero-alaska.jpg";
import logoImage from "@/assets/alaska-domains-logo.png";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const titleText = "Alaska Domains";
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
      <div className="container relative z-20 text-center px-4">
        {/* Logo with entrance animation */}
        <div className="mb-6 flex justify-center">
          <img 
            src={logoImage} 
            alt="Alaska Domains Logo" 
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain animate-logo-entrance animate-glow-pulse"
            style={{ animationDelay: '0.2s' }}
          />
        </div>
        
        {/* Animated Title with letter-by-letter reveal */}
        <h1 className="font-cinzel font-bold text-2xl md:text-4xl lg:text-5xl mb-4 tracking-widest perspective-1000">
          <span className="inline-flex overflow-hidden">
            {titleText.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block text-gradient-primary animate-letter-reveal"
                style={{
                  animationDelay: `${0.5 + index * 0.08}s`,
                  opacity: 0
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>
        
        {/* Animated underline */}
        <div className="flex justify-center mb-8">
          <div 
            className="h-0.5 w-48 md:w-64 bg-gradient-to-r from-transparent via-primary to-transparent animate-underline-expand origin-center"
            style={{ animationDelay: '1.8s', transform: 'scaleX(0)' }}
          />
        </div>
        
        <p 
          className="font-sans text-base md:text-lg lg:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed mb-12 font-light animate-fade-in opacity-0"
          style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        >
          Premium <span className="text-primary font-semibold">.com</span> Domains Inspired by the Last Frontier
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0"
          style={{ animationDelay: '2.3s', animationFillMode: 'forwards' }}
        >
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
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce animate-fade-in opacity-0"
        style={{ animationDelay: '2.6s', animationFillMode: 'forwards' }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
