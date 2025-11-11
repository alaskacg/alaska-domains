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
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 relative z-10">
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-center mb-4">
          Stats on .com Success
        </h2>
        <p className="text-center text-primary-foreground/80 mb-16 max-w-2xl mx-auto font-sans">
          The numbers speak for themselves
        </p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover-lift border border-primary-foreground/20">
                <div className="font-playfair font-black text-5xl mb-2 text-gold">
                  {stat.metric}
                </div>
                <div className="font-sans font-semibold text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-primary-foreground/70 font-sans">
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
