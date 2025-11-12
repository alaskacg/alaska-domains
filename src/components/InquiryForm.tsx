import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Send } from "lucide-react";

interface InquiryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domainName: string;
  domainPrice: string;
}

const InquiryForm = ({ open, onOpenChange, domainName, domainPrice }: InquiryFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    intendedUse: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const subject = `Inquiry about ${domainName}`;
    const body = `
Domain: ${domainName}
Price: ${domainPrice}

Contact Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}

Intended Use:
${formData.intendedUse}

Additional Message:
${formData.message}
    `.trim();

    window.location.href = `mailto:support@alaskadomains.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onOpenChange(false);
    setStep(1);
    setFormData({ name: "", email: "", phone: "", company: "", message: "", intendedUse: "" });
  };

  const canProceedStep1 = formData.name && formData.email;
  const canProceedStep2 = formData.intendedUse;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl">
            Inquiry for {domainName}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Price: {domainPrice}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <Label htmlFor="company">Company (Optional)</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Your Company LLC"
                />
              </div>
            </div>
          )}

          {/* Step 2: Intended Use */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="intendedUse">How do you plan to use this domain? *</Label>
                <Textarea
                  id="intendedUse"
                  value={formData.intendedUse}
                  onChange={(e) => handleChange("intendedUse", e.target.value)}
                  placeholder="Describe your business or project..."
                  rows={6}
                />
              </div>
            </div>
          )}

          {/* Step 3: Additional Message */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="message">Additional Comments (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Any questions or special requests..."
                  rows={6}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                className="gap-2 ml-auto"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gap-2 ml-auto"
              >
                Send Inquiry
                <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryForm;
