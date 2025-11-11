const Statement = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-earth to-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container px-4 relative z-10">
        <blockquote className="max-w-5xl mx-auto text-center">
          <div className="text-gold text-6xl mb-6 font-playfair">"</div>
          <p className="font-playfair font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-tight mb-8">
            A .com domain is the premium foundation of digital identity – institutional, standard-setting, and evoking instant authority.
          </p>
          <div className="text-gold text-6xl rotate-180 font-playfair">"</div>
        </blockquote>
      </div>
    </section>
  );
};

export default Statement;
