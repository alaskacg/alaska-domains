import DomainCard from "./DomainCard";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface Domain {
  id?: string;
  name: string;
  price: number | string;
  category: string;
  status?: string;
}

const Domains = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDomains();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('domains-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'domains' 
      }, () => {
        fetchDomains();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDomains = async () => {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .order('category', { ascending: true });

    if (!error && data) {
      setDomains(data);
    }
    setLoading(false);
  };

  // Group domains by category
  const groupedDomains = domains.reduce((acc, domain) => {
    if (!acc[domain.category]) {
      acc[domain.category] = [];
    }
    acc[domain.category].push(domain);
    return acc;
  }, {} as Record<string, Domain[]>);


  // Filter domains
  const filteredDomains = useMemo(() => {
    return domains.filter(domain => {
      const matchesSearch = domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           domain.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const price = typeof domain.price === 'number' ? domain.price : parseInt(domain.price.toString().replace(/[$,]/g, ''));
      let matchesPrice = true;
      
      if (priceFilter === "under30k") matchesPrice = price < 30000;
      else if (priceFilter === "30k-40k") matchesPrice = price >= 30000 && price < 40000;
      else if (priceFilter === "40k-50k") matchesPrice = price >= 40000 && price < 50000;
      else if (priceFilter === "over50k") matchesPrice = price >= 50000;
      
      return matchesSearch && matchesPrice;
    });
  }, [domains, searchQuery, priceFilter]);

  // Group filtered domains by category
  const filteredGroupedDomains = useMemo(() => {
    return filteredDomains.reduce((acc, domain) => {
      if (!acc[domain.category]) {
        acc[domain.category] = [];
      }
      acc[domain.category].push(domain);
      return acc;
    }, {} as Record<string, typeof domains>);
  }, [filteredDomains]);

  const filteredCategories = Object.keys(filteredGroupedDomains).sort();

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
          
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-6 text-gradient-primary animate-fade-in">
            Our Premium Domain Collection
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto font-sans text-base leading-relaxed">
            Each domain represents a unique investment opportunity in Alaska's digital landscape. 
            All domains are available for immediate purchase with secure escrow transfer.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          <div className="glass-morphism p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <h3 className="font-sans font-semibold text-sm text-foreground">Filter Domains</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Search domains or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              
              <div>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Filter by price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under30k">Under $30,000</SelectItem>
                    <SelectItem value="30k-40k">$30,000 - $40,000</SelectItem>
                    <SelectItem value="40k-50k">$40,000 - $50,000</SelectItem>
                    <SelectItem value="over50k">Over $50,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <div className="inline-block glass-morphism px-8 py-4 rounded-2xl border border-luxury/20">
              <span className="text-3xl font-bold text-gradient-luxury font-playfair">{filteredDomains.length}</span>
              <span className="text-light-gray ml-3 font-sans">
                {filteredDomains.length === domains.length ? 'Premium Domains Available' : 'Matching Domains'}
              </span>
            </div>
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
            
            {isDropdownOpen && filteredCategories.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-background border border-primary/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                <div className="max-h-[400px] overflow-y-auto">
                  {filteredCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => scrollToCategory(category)}
                      className="w-full px-6 py-3 text-left hover:bg-primary/10 transition-colors font-sans text-foreground border-b border-border/10 last:border-b-0"
                    >
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground ml-2 text-sm">
                        ({filteredGroupedDomains[category].length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Domains by Category */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-20 max-w-7xl mx-auto">
            {filteredCategories.map((category) => (
              <div key={category} id={`category-${category}`} className="scroll-mt-24">
                {/* Category Header */}
                <div className="text-center mb-10">
                  <div className="inline-block glass-morphism px-8 py-3 rounded-full border border-primary/20 mb-4">
                    <h3 className="font-playfair font-bold text-2xl text-gradient-luxury">
                      {category}
                    </h3>
                  </div>
                  <p className="text-muted-foreground font-sans">
                    {filteredGroupedDomains[category].length} premium domain{filteredGroupedDomains[category].length > 1 ? 's' : ''} available
                  </p>
                </div>

                {/* Category Domains Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGroupedDomains[category].map((domain, index) => (
                    <div 
                      key={domain.name}
                      className="animate-slide-up"
                      style={{ animationDelay: `${(index % 20) * 30}ms` }}
                    >
                      <DomainCard 
                        name={domain.name}
                        price={typeof domain.price === 'number' ? `$${domain.price.toLocaleString()}` : domain.price.toString()}
                        category={domain.category}
                        status={domain.status || 'available'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-sans text-sm">
              No domains match your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default Domains;
