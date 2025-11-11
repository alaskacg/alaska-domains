import { Quote } from "lucide-react";

const Statement = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-morphism p-12 md:p-16 rounded-3xl border border-primary/30 hover-lift">
            <Quote className="w-16 h-16 text-gold mb-8 mx-auto" />
            
            <blockquote className="text-center">
              <p className="font-playfair font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
                A .com domain is the premium foundation of digital identity – institutional, standard-setting, and evoking instant authority.
              </p>
            </blockquote>
            
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statement;
