import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full glass-morphism rounded-3xl p-8 md:p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
          <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Your payment was cancelled. No charges were made to your account.
        </p>

        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-8">
          <p className="text-muted-foreground">
            The domain you were interested in is still available. You can retry your purchase at any time.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/#domains')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Browse Domains
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 border border-border bg-background hover:bg-accent/10 px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
