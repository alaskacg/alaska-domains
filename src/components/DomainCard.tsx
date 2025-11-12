import { Mail, TrendingUp } from "lucide-react";

interface DomainCardProps {
  name: string;
  price: string;
  category: string;
}

const DomainCard = ({ name, price, category }: DomainCardProps) => {
  return (
    <div className="glass-morphism rounded-2xl p-6 hover-lift border border-primary/20 group relative overflow-hidden">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" 
           style={{ backgroundSize: '1000px 100%' }} />
      
      <div className="relative z-10">
        {/* Category Badge */}
        <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
          <span className="text-primary text-xs font-sans font-medium">{category}</span>
        </div>
        
        <h3 className="font-playfair font-bold text-xl mb-3 text-gradient-luxury group-hover:scale-105 transition-transform inline-block">
          {name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-luxury" />
          <span className="text-foreground text-lg font-sans font-bold">{price}</span>
        </div>
        
        <a 
          href={`mailto:support@alaskadomains.com?subject=Inquiry about ${name}`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg font-sans w-full justify-center group-hover:shadow-primary/50"
        >
          <Mail className="w-4 h-4" />
          Inquire Now
        </a>
      </div>
    </div>
  );
};

export default DomainCard;
