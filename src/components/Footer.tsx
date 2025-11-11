import { Mail, Shield, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-background to-background" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div>
              <h3 className="font-playfair font-bold text-3xl text-gradient-gold mb-4">
                Alaska Domains
              </h3>
              <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                Premium .com domains inspired by the Last Frontier. Institutional quality, timeless value, exceptional investment potential.
              </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-primary" />
                <h4 className="font-sans font-semibold text-lg text-foreground">Contact</h4>
              </div>
              <div className="space-y-3 font-sans">
                <p className="text-muted-foreground">
                  For purchases, inquiries, or support:
                </p>
                <a 
                  href="mailto:support@alaskadomains.com" 
                  className="inline-flex items-center gap-2 text-primary hover:text-gold transition-colors group"
                >
                  <span className="group-hover:underline">support@alaskadomains.com</span>
                </a>
                <p className="text-sm text-muted-foreground">
                  Response time: Within 24 hours
                </p>
              </div>
            </div>
            
            {/* Quick Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h4 className="font-sans font-semibold text-lg text-foreground">Secure Transactions</h4>
              </div>
              <ul className="space-y-2 text-muted-foreground font-sans text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Escrow.com verified transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ICANN compliant processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Instant domain transfer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Full ownership guarantee</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Legal Section */}
          <div className="border-t border-border pt-12 space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-morphism p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-gold" />
                  <h5 className="font-sans font-semibold text-foreground">Terms of Service</h5>
                </div>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  Domains sold as-is, subject to ICANN rules. All transfers via secure escrow. Prices subject to change.
                </p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-gold" />
                  <h5 className="font-sans font-semibold text-foreground">Privacy Policy</h5>
                </div>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  Email collected for inquiries only. No third-party sharing. Full GDPR compliance.
                </p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-gold" />
                  <h5 className="font-sans font-semibold text-foreground">Disclaimer</h5>
                </div>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  Availability not guaranteed until confirmed. Valuations based on market comparables.
                </p>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm font-sans mb-2">
              Copyright © 2025 Alaska Domains. All rights reserved.
            </p>
            <p className="text-muted-foreground/60 text-xs font-sans">
              Premium digital assets for forward-thinking investors and businesses
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
