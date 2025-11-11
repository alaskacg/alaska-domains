import { Mail } from "lucide-react";

interface DomainCardProps {
  name: string;
  price?: string;
  highlights: string[];
}

const DomainCard = ({ name, price, highlights }: DomainCardProps) => {
  return (
    <div className="bg-primary rounded-xl p-8 hover-lift shadow-xl border border-gold/30 group relative overflow-hidden">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-shimmer" 
           style={{ backgroundSize: '1000px 100%' }} />
      
      <div className="relative z-10">
        <h3 className="font-playfair font-bold text-3xl mb-4 text-gradient-gold">
          {name}
        </h3>
        
        {price && (
          <div className="text-primary-foreground text-xl mb-6 font-sans">
            <span className="text-gold font-bold">{price}</span>
          </div>
        )}
        
        <div className="mb-6 space-y-2">
          <p className="text-primary-foreground/90 font-semibold mb-3 font-sans">
            Premium Features:
          </p>
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
              <p className="text-primary-foreground/80 font-sans text-sm leading-relaxed">
                {highlight}
              </p>
            </div>
          ))}
        </div>
        
        <a 
          href="mailto:support@alaskadomains.com?subject=Inquiry about Alaska Domain" 
          className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg font-sans w-full justify-center"
        >
          <Mail className="w-5 h-5" />
          Inquire Now
        </a>
      </div>
    </div>
  );
};

export default DomainCard;
