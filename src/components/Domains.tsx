import DomainCard from "./DomainCard";

const domains = [
  {
    name: "AlaskaGold.com",
    price: "Premium Pricing",
    highlights: [
      "Perfect for mining, investment, or luxury Alaska brands",
      "Instant association with Alaska's gold rush heritage",
      "High-value keyword combination",
      "Strong SEO potential in multiple industries"
    ]
  },
  {
    name: "AlaskaFishing.com",
    price: "Premium Pricing",
    highlights: [
      "Ideal for tourism, charters, and fishing industry",
      "Alaska's #1 outdoor activity - massive search volume",
      "Perfect for guides, lodges, and equipment retailers",
      "Authoritative domain for the fishing sector"
    ]
  },
  {
    name: "AlaskaTours.com",
    price: "Premium Pricing",
    highlights: [
      "Tourism industry powerhouse domain",
      "Direct, memorable, and brandable",
      "Multi-billion dollar industry keyword",
      "Instant credibility for travel businesses"
    ]
  },
  {
    name: "AlaskaWildlife.com",
    price: "Premium Pricing",
    highlights: [
      "Perfect for conservation, tourism, and education",
      "Alaska's wildlife draws millions annually",
      "Strong environmental and eco-tourism appeal",
      "Premium positioning in nature sector"
    ]
  },
  {
    name: "AlaskaLodge.com",
    price: "Premium Pricing",
    highlights: [
      "Premium hospitality and accommodation domain",
      "Perfect for luxury wilderness retreats",
      "Strong booking and reservation potential",
      "Evokes authentic Alaska experience"
    ]
  },
  {
    name: "AlaskaAdventure.com",
    price: "Premium Pricing",
    highlights: [
      "Adventure tourism mega-keyword",
      "Broad appeal across outdoor activities",
      "High commercial intent traffic",
      "Perfect for tour operators and guides"
    ]
  },
  {
    name: "AlaskaReal.com",
    price: "Premium Pricing",
    highlights: [
      "Real estate market authority",
      "Short, memorable, and professional",
      "Multi-use: properties, land, commercial",
      "Premium Alaska real estate positioning"
    ]
  },
  {
    name: "AlaskaHomes.com",
    price: "Premium Pricing",
    highlights: [
      "Residential real estate powerhouse",
      "Direct search term with high intent",
      "Perfect for agencies and listings",
      "Established market keyword"
    ]
  }
];

const Domains = () => {
  return (
    <section id="domains" className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4 text-primary">
            Our Premium Domain Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans text-lg">
            Each domain represents a unique investment opportunity in Alaska's digital landscape
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {domains.map((domain, index) => (
            <div 
              key={domain.name}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <DomainCard {...domain} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Domains;
