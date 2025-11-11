const stats = [
  {
    metric: "43%",
    label: "Market Share",
    detail: "157M+ .com registrations globally"
  },
  {
    metric: "90%+",
    label: "Fortune 500",
    detail: "Leading companies choose .com"
  },
  {
    metric: "20-30%",
    label: "More Traffic",
    detail: "Higher organic search visibility"
  },
  {
    metric: "15-25%",
    label: "Credibility Boost",
    detail: "Enhanced trust and authority"
  },
  {
    metric: "29%",
    label: "Re-registration Rate",
    detail: "Lower churn, lasting value"
  }
];

const Stats = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card" />
      
      {/* Decorative glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30" />
      
      <div className="container px-4 relative z-10">
        <h2 className="font-playfair font-bold text-5xl md:text-6xl text-center mb-6 text-gradient-gold">
          Stats on .com Success
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-sans text-lg">
          The numbers speak for themselves
        </p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="glass-morphism rounded-2xl p-8 hover-lift border border-primary/20 group">
                <div className="font-playfair font-black text-6xl mb-3 text-gradient-gold group-hover:scale-110 transition-transform inline-block">
                  {stat.metric}
                </div>
                <div className="font-sans font-semibold text-xl mb-2 text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground font-sans">
                  {stat.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
