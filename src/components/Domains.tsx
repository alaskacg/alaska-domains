import DomainCard from "./DomainCard";
import { Search } from "lucide-react";

const domains = [
  // Tourism & Travel
  { name: "AlaskaTours.com", price: "$25,000", category: "Tourism" },
  { name: "AlaskaAdventure.com", price: "$18,000", category: "Tourism" },
  { name: "AlaskaTravel.com", price: "$22,000", category: "Tourism" },
  { name: "AlaskaCruise.com", price: "$20,000", category: "Tourism" },
  { name: "AlaskaVacation.com", price: "$15,000", category: "Tourism" },
  { name: "AlaskaTrip.com", price: "$12,000", category: "Tourism" },
  
  // Outdoor & Adventure
  { name: "AlaskaFishing.com", price: "$28,000", category: "Outdoor" },
  { name: "AlaskaHunting.com", price: "$16,000", category: "Outdoor" },
  { name: "AlaskaWildlife.com", price: "$19,000", category: "Outdoor" },
  { name: "AlaskaHiking.com", price: "$14,000", category: "Outdoor" },
  { name: "AlaskaCamping.com", price: "$13,000", category: "Outdoor" },
  { name: "AlaskaKayaking.com", price: "$11,000", category: "Outdoor" },
  
  // Hospitality
  { name: "AlaskaLodge.com", price: "$24,000", category: "Hospitality" },
  { name: "AlaskaResort.com", price: "$21,000", category: "Hospitality" },
  { name: "AlaskaHotels.com", price: "$17,000", category: "Hospitality" },
  { name: "AlaskaCabin.com", price: "$15,000", category: "Hospitality" },
  { name: "AlaskaBed.com", price: "$9,000", category: "Hospitality" },
  
  // Real Estate & Property
  { name: "AlaskaReal.com", price: "$26,000", category: "Real Estate" },
  { name: "AlaskaHomes.com", price: "$23,000", category: "Real Estate" },
  { name: "AlaskaProperty.com", price: "$20,000", category: "Real Estate" },
  { name: "AlaskaLand.com", price: "$22,000", category: "Real Estate" },
  { name: "AlaskaRealty.com", price: "$18,000", category: "Real Estate" },
  { name: "AlaskaEstates.com", price: "$16,000", category: "Real Estate" },
  
  // Business & Commerce
  { name: "AlaskaGold.com", price: "$35,000", category: "Business" },
  { name: "AlaskaBusiness.com", price: "$19,000", category: "Business" },
  { name: "AlaskaShop.com", price: "$14,000", category: "Business" },
  { name: "AlaskaMarket.com", price: "$13,000", category: "Business" },
  { name: "AlaskaStore.com", price: "$12,000", category: "Business" },
  
  // Transportation
  { name: "AlaskaAir.com", price: "$30,000", category: "Transportation" },
  { name: "AlaskaFlights.com", price: "$17,000", category: "Transportation" },
  { name: "AlaskaRentals.com", price: "$15,000", category: "Transportation" },
  { name: "AlaskaCars.com", price: "$13,000", category: "Transportation" },
  
  // Food & Dining
  { name: "AlaskaSeafood.com", price: "$21,000", category: "Food & Dining" },
  { name: "AlaskaSalmon.com", price: "$18,000", category: "Food & Dining" },
  { name: "AlaskaRestaurants.com", price: "$14,000", category: "Food & Dining" },
  { name: "AlaskaCrab.com", price: "$16,000", category: "Food & Dining" },
  
  // Nature & Environment
  { name: "AlaskaNature.com", price: "$17,000", category: "Nature" },
  { name: "AlaskaGlacier.com", price: "$19,000", category: "Nature" },
  { name: "AlaskaMountain.com", price: "$15,000", category: "Nature" },
  { name: "AlaskaRiver.com", price: "$12,000", category: "Nature" },
  
  // Culture & Information
  { name: "AlaskaGuide.com", price: "$20,000", category: "Information" },
  { name: "AlaskaNews.com", price: "$18,000", category: "Information" },
  { name: "AlaskaInfo.com", price: "$14,000", category: "Information" },
  { name: "AlaskaBlog.com", price: "$10,000", category: "Information" },
  
  // Services
  { name: "AlaskaPhotography.com", price: "$13,000", category: "Services" },
  { name: "AlaskaWedding.com", price: "$15,000", category: "Services" },
  { name: "AlaskaEvents.com", price: "$12,000", category: "Services" },
  
  // Premium Generic
  { name: "AlaskaOnline.com", price: "$16,000", category: "Premium" },
  { name: "AlaskaLife.com", price: "$19,000", category: "Premium" },
  { name: "AlaskaDirect.com", price: "$14,000", category: "Premium" },
];

const Domains = () => {
  return (
    <section id="domains" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted via-background to-muted" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-morphism rounded-full mb-6">
            <Search className="w-5 h-5 text-primary" />
            <span className="text-foreground font-sans font-medium">Premium Portfolio</span>
          </div>
          
          <h2 className="font-playfair font-bold text-5xl md:text-6xl mb-6 text-gradient-primary">
            Our Premium Domain Collection
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto font-sans text-lg leading-relaxed">
            Each domain represents a unique investment opportunity in Alaska's digital landscape. 
            All domains are available for immediate purchase with secure escrow transfer.
          </p>
        </div>
        
        {/* Domain Count */}
        <div className="text-center mb-12">
          <div className="inline-block glass-morphism px-8 py-4 rounded-2xl border border-gold/20">
            <span className="text-4xl font-bold text-gradient-gold font-playfair">{domains.length}</span>
            <span className="text-muted-foreground ml-3 font-sans">Premium Domains Available</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {domains.map((domain, index) => (
            <div 
              key={domain.name}
              className="animate-slide-up"
              style={{ animationDelay: `${(index % 20) * 30}ms` }}
            >
              <DomainCard {...domain} />
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-morphism p-8 rounded-2xl max-w-2xl mx-auto border border-primary/20">
            <h3 className="font-playfair font-bold text-2xl mb-4 text-foreground">
              Don't see what you're looking for?
            </h3>
            <p className="text-muted-foreground mb-6 font-sans">
              We have access to additional premium Alaska domains. Contact us for custom inquiries.
            </p>
            <a 
              href="mailto:support@alaskadomains.com" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold hover-lift shadow-2xl font-sans"
            >
              Contact for Custom Domains
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Domains;
