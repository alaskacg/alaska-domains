import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the domain purchase process work?",
    answer: "After submitting an inquiry, we'll contact you to discuss payment and transfer details. We use secure escrow services to protect both parties. Once payment is confirmed, we'll transfer the domain to your registrar of choice, typically within 5-7 business days."
  },
  {
    question: "Are these prices negotiable?",
    answer: "Listed prices reflect current market value and our assessment of each domain's potential. While we're open to serious offers, domains are priced competitively. For multiple domain purchases, we may offer package discounts."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept wire transfers, ACH, and escrow services like Escrow.com. For qualified buyers, we can also arrange payment plans on domains over $30,000."
  },
  {
    question: "Can I lease or finance a domain?",
    answer: "Yes, we offer lease-to-own arrangements for qualified buyers on select premium domains. Monthly payment plans are available with an initial down payment, typically 10-20% of the total price."
  },
  {
    question: "What's included with the domain purchase?",
    answer: "You receive full ownership and transfer of the domain name. We provide assistance with the transfer process and basic setup guidance. The domain comes free of any liens or legal encumbrances."
  },
  {
    question: "How long does the transfer take?",
    answer: "Most transfers complete within 5-7 business days after payment confirmation. Some registrars may take up to 10 days. We'll guide you through each step and ensure a smooth transition."
  },
  {
    question: "Do you have other Alaska domains not listed?",
    answer: "Yes, we have access to additional premium Alaska-focused domains. Contact us with your specific needs, and we'll check our extended portfolio and industry connections."
  },
  {
    question: "What makes these domains valuable?",
    answer: "These are premium .com domains with strong Alaska branding, industry relevance, and search appeal. They're memorable, type-in traffic generators, and position your business as an established Alaska authority in your industry."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-morphism rounded-full mb-6">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-foreground font-sans font-medium">Questions & Answers</span>
          </div>
          
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-6 text-gradient-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans text-sm">
            Everything you need to know about purchasing premium Alaska domains
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-morphism rounded-xl border border-primary/20 px-6 overflow-hidden"
              >
                <AccordionTrigger className="font-sans font-semibold text-sm text-left hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground font-sans text-sm mb-4">
            Still have questions?
          </p>
          <a 
            href="mailto:support@alaskadomains.com" 
            className="inline-flex items-center gap-2 text-primary font-sans font-semibold hover:underline"
          >
            Contact us directly
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
