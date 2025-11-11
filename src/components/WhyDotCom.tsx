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
    <section className="py-20 bg-muted">
      <div className="container px-4">
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-center mb-4 text-primary">
          Why .com Domains Command Premiums
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-sans">
          The gold standard of digital real estate
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-xl hover-lift shadow-lg border border-border animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-playfair font-bold text-xl mb-3 text-card-foreground">
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
