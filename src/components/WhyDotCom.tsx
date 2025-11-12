import { Globe, TrendingUp, Shield, Search, Users } from "lucide-react";

const reasons = [
  {
    icon: Globe,
    title: "Over 40 Years of Familiarity",
    description: "Established in 1985, .com is the original and most recognized domain extension worldwide."
  },
  {
    icon: Users,
    title: "Global Appeal and Branding",
    description: "Universal recognition makes .com the standard for international business presence."
  },
  {
    icon: TrendingUp,
    title: "Scarcity Driving Investment Value",
    description: "With premium .com domains increasingly scarce, values continue to appreciate over time."
  },
  {
    icon: Search,
    title: "SEO and Traffic Advantages",
    description: ".com domains receive 20-30% more organic traffic and higher search engine rankings."
  },
  {
    icon: Shield,
    title: "Market Demand and Supply",
    description: "Fortune 500 companies choose .com 90%+ of the time for credibility and trust."
  }
];

const WhyDotCom = () => {
  return (
    <section id="why-dotcom" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 text-gradient-primary">
            Why .com Domains Command Premiums
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto font-sans">
            The gold standard of digital real estate
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="glass-morphism p-8 rounded-2xl hover-lift shadow-lg animate-slide-up group text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-playfair font-bold text-xl mb-4 text-foreground">
                {reason.title}
              </h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDotCom;
