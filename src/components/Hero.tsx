import heroImage from "@/assets/hero-alaska.jpg";
import { ArrowDown, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const titleText = "Alaska Domains";
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
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
      
      {/* Animated Aurora Effect */}
      <div className="absolute inset-0 z-5 overflow-hidden opacity-30">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/40 via-transparent to-transparent animate-aurora-1" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/30 via-transparent to-transparent animate-aurora-2" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container relative z-20 text-center px-4 py-8">
        {/* Animated Title with letter-by-letter reveal */}
        <h1 className="font-cinzel font-bold text-2xl md:text-3xl lg:text-4xl mb-3 tracking-[0.3em] uppercase">
          <span className="inline-flex overflow-hidden">
            {titleText.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block text-gradient-primary transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
                style={{
                  transitionDelay: `${index * 80}ms`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>
        
        {/* Animated underline */}
        <div className="flex justify-center mb-4">
          <div 
            className={`h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000 ${
              isLoaded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{ transitionDelay: '1.4s' }}
          />
        </div>
        
        <p 
          className={`font-cinzel text-sm md:text-base lg:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8 tracking-wider transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1.6s' }}
        >
          Premium <span className="text-primary font-semibold">.com</span> Domains Inspired by the Last Frontier
        </p>
        
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1.9s' }}
        >
          <a 
            href="#domains" 
            className="group inline-flex items-center gap-2 glass-morphism px-8 py-4 rounded-xl text-base font-cinzel tracking-wide hover-lift shadow-2xl border border-primary/30 relative overflow-hidden"
          >
            <span className="relative z-10">Explore Domains</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <a 
            href="mailto:support@alaskadomains.com" 
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-xl text-base font-cinzel tracking-wide hover-lift shadow-2xl relative overflow-hidden"
          >
            <Mail className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '2.2s' }}
      >
        <div className="w-5 h-8 border border-primary/50 rounded-full flex justify-center backdrop-blur-sm animate-bounce">
          <div className="w-0.5 h-2 bg-primary rounded-full mt-1.5 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
