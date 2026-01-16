import DomainCard from "./DomainCard";
import { Search, ChevronDown, SlidersHorizontal, RefreshCw } from "lucide-react";
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
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const fetchDomains = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      // Keep UI stable if backend hiccups; log for debugging.
      console.error('[Domains] Failed to fetch domains', error);
      setLoading(false);
      return;
    }

    setDomains(data ?? []);
    setLastSyncedAt(new Date());
    setLoading(false);
  };

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

  const handleManualRefresh = async () => {
    await fetchDomains();
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
      
      if (priceFilter === "under10k") matchesPrice = price < 10000;
      else if (priceFilter === "10k-20k") matchesPrice = price >= 10000 && price < 20000;
      else if (priceFilter === "20k-35k") matchesPrice = price >= 20000 && price < 35000;
      else if (priceFilter === "over35k") matchesPrice = price >= 35000;
      
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
    <section id="domains" className="py-12 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted via-background to-muted" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="font-cinzel font-bold text-lg md:text-xl mb-3 text-gradient-primary animate-fade-in tracking-widest uppercase">
            Premium Domain Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans text-sm leading-relaxed">
            Each domain represents a unique investment opportunity in Alaska's digital landscape.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-3">
          <div className="glass-morphism p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h3 className="font-sans font-semibold text-sm text-foreground">Filter Domains</h3>
              </div>

              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={loading}
                className="glass-morphism px-3 py-2 rounded-lg border border-primary/20 hover-lift font-sans text-xs text-foreground inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <RefreshCw className={"w-4 h-4 text-primary " + (loading ? "animate-spin" : "")}
                />
                Refresh
              </button>
            </div>

            {lastSyncedAt && (
              <p className="text-xs text-muted-foreground font-sans mb-4">
                Last synced: {lastSyncedAt.toLocaleTimeString()}
              </p>
            )}
            
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
                    <SelectItem value="under10k">Under $10,000</SelectItem>
                    <SelectItem value="10k-20k">$10,000 - $20,000</SelectItem>
                    <SelectItem value="20k-35k">$20,000 - $35,000</SelectItem>
                    <SelectItem value="over35k">Over $35,000</SelectItem>
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
        <div className="flex justify-center mb-8">
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
          <div className="space-y-12 max-w-7xl mx-auto">
            {filteredCategories.map((category) => (
              <div key={category} id={`category-${category}`} className="scroll-mt-24">
                <div className="text-center mb-8">
                  <h3 className="font-cinzel font-bold text-base tracking-widest text-gradient-luxury uppercase inline-block">
                    {category}
                  </h3>
                  <p className="text-muted-foreground font-sans text-xs mt-1 tracking-wide">
                    {filteredGroupedDomains[category].length} domain{filteredGroupedDomains[category].length > 1 ? 's' : ''} available
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
