const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="font-playfair font-bold text-2xl text-gradient-gold mb-4">
                Alaska Domains
              </h3>
              <p className="text-primary-foreground/80 font-sans leading-relaxed">
                Premium .com domains inspired by the Last Frontier. Institutional quality, timeless value.
              </p>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-sans font-semibold text-lg mb-4 text-gold">Contact</h4>
              <div className="space-y-2 font-sans">
                <p className="text-primary-foreground/80">
                  For purchases or support:
                </p>
                <a 
                  href="mailto:support@alaskadomains.com" 
                  className="text-gold hover:text-gold/80 transition-colors inline-block"
                >
                  support@alaskadomains.com
                </a>
              </div>
            </div>
            
            {/* Quick Info */}
            <div>
              <h4 className="font-sans font-semibold text-lg mb-4 text-gold">Domain Investment</h4>
              <ul className="space-y-2 text-primary-foreground/80 font-sans text-sm">
                <li>• Premium .com domains</li>
                <li>• Alaska-themed portfolio</li>
                <li>• Institutional quality</li>
                <li>• Secure escrow transfers</li>
              </ul>
            </div>
          </div>
          
          {/* Legal Section */}
          <div className="border-t border-primary-foreground/20 pt-8 space-y-6">
            <div>
              <h5 className="font-sans font-semibold text-gold mb-3">Terms of Service</h5>
              <p className="text-primary-foreground/70 text-sm font-sans leading-relaxed">
                Domains sold as-is, subject to ICANN rules and regulations. No warranties expressed or implied. 
                All transfers conducted via secure escrow services. Prices and availability subject to change without notice.
              </p>
            </div>
            
            <div>
              <h5 className="font-sans font-semibold text-gold mb-3">Privacy Policy</h5>
              <p className="text-primary-foreground/70 text-sm font-sans leading-relaxed">
                We collect email addresses for inquiry purposes only. Your information is never shared with third parties. 
                We respect your privacy and comply with all applicable data protection regulations.
              </p>
            </div>
            
            <div>
              <h5 className="font-sans font-semibold text-gold mb-3">Disclaimer</h5>
              <p className="text-primary-foreground/70 text-sm font-sans leading-relaxed">
                Prices subject to change. Availability not guaranteed until purchase is confirmed. 
                Domain valuations are estimates based on market conditions and comparable sales.
              </p>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/60 text-sm font-sans">
              Copyright © 2025 Alaska Domains. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
