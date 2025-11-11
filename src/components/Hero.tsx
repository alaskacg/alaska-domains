import heroImage from "@/assets/hero-alaska.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0 parallax"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 100, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
        }}
      />
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-background z-10" />
      
      {/* Content */}
      <div className="container relative z-20 text-center px-4 animate-fade-in">
        <h1 className="font-playfair font-black text-5xl md:text-7xl lg:text-8xl mb-6 text-gradient-gold drop-shadow-2xl">
          Alaska Domains
        </h1>
        <p className="font-sans text-xl md:text-2xl lg:text-3xl text-primary-foreground max-w-4xl mx-auto leading-relaxed mb-8 drop-shadow-lg">
          Premium .com Domains Inspired by the Last Frontier – Institutional, Timeless, and in High Demand
        </p>
        <a 
          href="#domains" 
          className="inline-block bg-gold text-gold-foreground px-10 py-4 rounded-lg text-lg font-semibold hover-lift shadow-2xl font-sans"
        >
          Explore Premium Domains
        </a>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
