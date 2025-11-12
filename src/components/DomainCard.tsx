import { Mail, TrendingUp, ShoppingCart } from "lucide-react";
import { useState } from "react";
import InquiryForm from "./InquiryForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface DomainCardProps {
  name: string;
  price: string;
  category: string;
  status?: string;
}

const DomainCard = ({ name, price, category, status = 'available' }: DomainCardProps) => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyNow = async () => {
    setIsProcessing(true);
    try {
      const priceNum = parseInt(price.replace(/[^0-9]/g, ''));
      
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          domainName: name,
          domainPrice: priceNum,
          buyerEmail: '',
          buyerName: '',
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
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
        
        <div className="flex gap-2">
          <button 
            onClick={handleBuyNow}
            disabled={isProcessing || status !== 'available'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg font-sans flex-1 justify-center group-hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ShoppingCart className="w-4 h-4" />
            {isProcessing ? 'Processing...' : status === 'available' ? 'Buy Now' : 'Sold'}
          </button>
          
          <button 
            onClick={() => setIsInquiryOpen(true)}
            className="inline-flex items-center gap-2 border-2 border-primary/20 hover:border-primary/40 bg-background/50 hover:bg-primary/5 px-4 py-3 rounded-xl font-semibold transition-all font-sans"
            title="Send inquiry"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>

      <InquiryForm 
        open={isInquiryOpen}
        onOpenChange={setIsInquiryOpen}
        domainName={name}
        domainPrice={price}
      />
    </div>
  );
};

export default DomainCard;
