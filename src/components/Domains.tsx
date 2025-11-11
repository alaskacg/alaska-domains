import DomainCard from "./DomainCard";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const domains = [
  // Mining & Exploration
  { name: "akmines.com", price: "$45,000", category: "Mining" },
  { name: "akminingcompany.com", price: "$38,000", category: "Mining" },
  { name: "akmininggroup.com", price: "$42,000", category: "Mining" },
  { name: "akminingequipment.com", price: "$28,000", category: "Mining" },
  { name: "alaskamininggroup.com", price: "$48,000", category: "Mining" },
  { name: "alaskaminingequipment.com", price: "$32,000", category: "Mining" },
  { name: "alcanminingcompany.com", price: "$35,000", category: "Mining" },
  { name: "amblermines.com", price: "$32,000", category: "Mining" },
  { name: "amblerminingcompany.com", price: "$30,000", category: "Mining" },
  { name: "bethelminingcompany.com", price: "$28,000", category: "Mining" },
  
  // Exploration & Survey
  { name: "akexploration.com", price: "$36,000", category: "Exploration" },
  { name: "akexploratory.com", price: "$28,000", category: "Exploration" },
  { name: "akmineralexploration.com", price: "$32,000", category: "Exploration" },
  { name: "alaskamineralexploration.com", price: "$38,000", category: "Exploration" },
  { name: "alaskaexplorationllc.com", price: "$35,000", category: "Exploration" },
  { name: "akdronesurvey.com", price: "$24,000", category: "Exploration" },
  { name: "alaskadronesurvey.com", price: "$28,000", category: "Exploration" },
  
  // Gold & Resources
  { name: "akgolddirect.com", price: "$42,000", category: "Gold" },
  { name: "akgoldexchange.com", price: "$45,000", category: "Gold" },
  { name: "akgoldgroup.com", price: "$48,000", category: "Gold" },
  { name: "akgoldnews.com", price: "$32,000", category: "Gold" },
  { name: "alaskagolddirect.com", price: "$52,000", category: "Gold" },
  { name: "alaskagoldgroup.com", price: "$55,000", category: "Gold" },
  { name: "alaskagoldnews.com", price: "$38,000", category: "Gold" },
  
  // Oil & Gas
  { name: "akoilcompany.com", price: "$48,000", category: "Oil & Gas" },
  { name: "alaskaoilcompany.com", price: "$58,000", category: "Oil & Gas" },
  { name: "alaskaoilandgascompany.com", price: "$52,000", category: "Oil & Gas" },
  
  // Real Estate & Listings
  { name: "aklistings.com", price: "$38,000", category: "Real Estate" },
  { name: "kenailistings.com", price: "$28,000", category: "Real Estate" },
  { name: "kenailandsales.com", price: "$24,000", category: "Real Estate" },
  { name: "kenaihomesales.com", price: "$26,000", category: "Real Estate" },
  { name: "kenaihomesforsale.com", price: "$24,000", category: "Real Estate" },
  { name: "kenaiboroughrealty.com", price: "$22,000", category: "Real Estate" },
  { name: "kenaiborough.com", price: "$32,000", category: "Real Estate" },
  { name: "chugachlistings.com", price: "$22,000", category: "Real Estate" },
  { name: "tongasslistings.com", price: "$22,000", category: "Real Estate" },
  { name: "alcanlistings.com", price: "$24,000", category: "Real Estate" },
  
  // Guide Services
  { name: "akguidelistings.com", price: "$26,000", category: "Guide Services" },
  { name: "akguidesearch.com", price: "$28,000", category: "Guide Services" },
  { name: "akguideservices.com", price: "$32,000", category: "Guide Services" },
  { name: "alaskaguidelistings.com", price: "$32,000", category: "Guide Services" },
  
  // News & Media
  { name: "kenainews.com", price: "$28,000", category: "News" },
  { name: "chugachnews.com", price: "$24,000", category: "News" },
  { name: "tongassnews.com", price: "$24,000", category: "News" },
  { name: "alaskanewscorporation.com", price: "$42,000", category: "News" },
  { name: "mavericknewsagency.com", price: "$38,000", category: "News" },
  { name: "maverickworldnews.com", price: "$45,000", category: "News" },
  { name: "mavnewsagency.com", price: "$32,000", category: "News" },
  
  // Foundations & Organizations
  { name: "chugachfoundation.com", price: "$35,000", category: "Foundation" },
  { name: "greatstatefoundation.com", price: "$38,000", category: "Foundation" },
  { name: "thealaskafoundation.com", price: "$48,000", category: "Foundation" },
  { name: "thealaskantrust.com", price: "$42,000", category: "Foundation" },
  { name: "tongassfoundation.com", price: "$32,000", category: "Foundation" },
  
  // Retail & Commerce
  { name: "alaskasstore.com", price: "$28,000", category: "Retail" },
  { name: "kenaiautosales.com", price: "$26,000", category: "Automotive" },
  { name: "kenaipeninsularentals.com", price: "$22,000", category: "Rentals" },
  
  // Maritime
  { name: "alaskanboats.com", price: "$32,000", category: "Maritime" },
  
  // Emergency Services
  { name: "akfires.com", price: "$35,000", category: "Emergency" },
  { name: "alaskafires.com", price: "$42,000", category: "Emergency" },
  
  // General Alaska
  { name: "akdigs.com", price: "$28,000", category: "General" },
  { name: "alaskadigs.com", price: "$32,000", category: "General" },
  { name: "alaskadomains.com", price: "$65,000", category: "Premium" },
];

// Group domains by category
const groupedDomains = domains.reduce((acc, domain) => {
  if (!acc[domain.category]) {
    acc[domain.category] = [];
  }
  acc[domain.category].push(domain);
  return acc;
}, {} as Record<string, typeof domains>);

const categories = Object.keys(groupedDomains).sort();

const Domains = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsDropdownOpen(false);
    }
  };

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

        {/* Category Navigation Dropdown */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="glass-morphism px-6 py-4 rounded-xl border border-primary/20 flex items-center gap-3 hover-lift font-sans font-medium text-foreground min-w-[280px] justify-between"
            >
              <span>Jump to Category</span>
              <ChevronDown className={`w-5 h-5 text-primary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-background border border-primary/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                <div className="max-h-[400px] overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => scrollToCategory(category)}
                      className="w-full px-6 py-3 text-left hover:bg-primary/10 transition-colors font-sans text-foreground border-b border-border/10 last:border-b-0"
                    >
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground ml-2 text-sm">
                        ({groupedDomains[category].length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Domains by Category */}
        <div className="space-y-20 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div key={category} id={`category-${category}`} className="scroll-mt-24">
              {/* Category Header */}
              <div className="text-center mb-10">
                <div className="inline-block glass-morphism px-8 py-3 rounded-full border border-primary/20 mb-4">
                  <h3 className="font-playfair font-bold text-3xl text-gradient-gold">
                    {category}
                  </h3>
                </div>
                <p className="text-muted-foreground font-sans">
                  {groupedDomains[category].length} premium domain{groupedDomains[category].length > 1 ? 's' : ''} available
                </p>
              </div>

              {/* Category Domains Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {groupedDomains[category].map((domain, index) => (
                  <div 
                    key={domain.name}
                    className="animate-slide-up"
                    style={{ animationDelay: `${(index % 20) * 30}ms` }}
                  >
                    <DomainCard {...domain} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-20">
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
