import { CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const domainName = searchParams.get('domain');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full glass-morphism rounded-3xl p-8 md:p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-gradient-luxury">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your purchase. Your domain acquisition is being processed.
        </p>

        {domainName && (
          <div className="bg-background/50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-playfair text-2xl font-bold mb-4">Purchase Details</h2>
            <div className="space-y-2 text-muted-foreground">
              <p><span className="font-semibold text-foreground">Domain:</span> {domainName}</p>
              <p><span className="font-semibold text-foreground">Status:</span> Processing</p>
            </div>
          </div>
        )}

        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-lg mb-3">What happens next?</h3>
          <ul className="text-left space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>You will receive a confirmation email within 24 hours</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Our team will initiate the secure escrow transfer process</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Domain transfer typically completes within 5-10 business days</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>All transfers comply with ICANN regulations</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          <strong>Important:</strong> All sales are final. Please review our terms and conditions for complete details.
        </p>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
