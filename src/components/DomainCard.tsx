import { Mail, TrendingUp } from "lucide-react";

interface DomainCardProps {
  name: string;
  price: string;
  category: string;
  status?: string;
}

const DomainCard = ({ name, price, category, status = 'available' }: DomainCardProps) => {
  return (
    <div className="glass-morphism rounded-2xl p-5 hover-lift border border-primary/20 group relative overflow-hidden">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" 
           style={{ backgroundSize: '1000px 100%' }} />
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Category Badge */}
        <div className="inline-block px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-full mb-3">
          <span className="text-primary text-xs font-sans font-medium tracking-wide">{category}</span>
        </div>
        
        <h3 className="font-cinzel font-bold text-base mb-2 text-gradient-luxury group-hover:scale-105 transition-transform inline-block tracking-wide">
          {name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-4">
          <TrendingUp className="w-3.5 h-3.5 text-luxury" />
          <span className="text-foreground text-base font-sans font-bold">{price}</span>
          {status !== 'available' && (
            <span className="text-xs text-muted-foreground ml-auto uppercase tracking-wider">Sold</span>
          )}
        </div>
        
        <a 
          href={`mailto:support@alaskadomains.com?subject=Inquiry about ${name}&body=I am interested in the domain ${name} listed at ${price}. Please provide more information.`}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-4 py-2.5 rounded-xl font-sans text-sm font-semibold hover:scale-105 transition-transform shadow-lg group-hover:shadow-primary/30"
        >
          <Mail className="w-4 h-4" />
          Inquire Now
        </a>
      </div>
    </div>
  );
};

export default DomainCard;
