import { Globe, TrendingUp, Shield, Search, Users, DollarSign, BarChart3, Award, Target, Zap } from "lucide-react";

const reasons = [
  {
    icon: DollarSign,
    title: "$1.5 Billion in Sales",
    description: "Domain aftermarket generated $1.5B+ in 2023, with premium .com domains commanding 70% of total sales value."
  },
  {
    icon: TrendingUp,
    title: "35% Annual Appreciation",
    description: "Premium domains have historically appreciated 25-35% annually, outperforming most traditional investments."
  },
  {
    icon: Globe,
    title: "40+ Years of Trust",
    description: "Since 1985, .com has maintained 43% global market share with 157M+ active registrations worldwide."
  },
  {
    icon: Users,
    title: "90% Fortune 500 Choice",
    description: "Over 90% of Fortune 500 companies exclusively use .com for their primary domain, establishing it as the corporate standard."
  },
  {
    icon: Search,
    title: "20-30% More Traffic",
    description: ".com domains receive 20-30% higher organic search traffic and rank better in search engine results."
  },
  {
    icon: Shield,
    title: "Zero Maintenance Costs",
    description: "Domains require minimal annual renewal fees ($10-15) with no physical maintenance, insurance, or storage costs."
  },
  {
    icon: BarChart3,
    title: "$100M+ Single Sales",
    description: "Premium domains like Voice.com ($30M), 360.com ($17M), and Insurance.com ($35M) prove exceptional ROI potential."
  },
  {
    icon: Award,
    title: "95% Brand Recall",
    description: ".com domains achieve 95% brand recall versus 70% for alternative extensions, directly impacting customer acquisition."
  },
  {
    icon: Target,
    title: "Limited Supply Asset",
    description: "Only 137M quality .com names remain from 1.6B possible combinations, creating scarcity-driven value appreciation."
  },
  {
    icon: Zap,
    title: "Instant Liquidity",
    description: "Domains can be sold 24/7 globally through established marketplaces with typical transactions completing in 7-14 days."
  }
];

const WhyDotCom = () => {
  return (
    <section id="why-dotcom" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-cinzel font-bold text-xl md:text-2xl mb-4 text-gradient-primary tracking-widest uppercase">
            Why Domains Are Premier Investments
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto font-sans">
            Proven statistics and market data on domain investment value
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="glass-morphism p-5 rounded-2xl hover-lift shadow-lg animate-slide-up group text-center relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mx-auto">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-cinzel font-bold text-sm mb-2 text-foreground tracking-wide">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground font-sans leading-relaxed text-xs">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDotCom;