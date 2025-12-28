import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  DollarSign, 
  Globe, 
  ShoppingCart, 
  Edit2, 
  Save, 
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
}

interface Purchase {
  id: string;
  domain_name: string;
  domain_price: number;
  buyer_email: string;
  buyer_name: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [domains, setDomains] = useState<Domain[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [editingDomain, setEditingDomain] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [stripeConfigured, setStripeConfigured] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchDomains();
      fetchPurchases();
      checkStripeConfig();
    }
  }, [user, isAdmin]);

  const checkStripeConfig = async () => {
    // Check if Stripe is configured by trying to access the edge function
    try {
      const { error } = await supabase.functions.invoke('create-checkout-session', {
        body: { domainName: 'test', domainPrice: 0, buyerEmail: 'test@test.com' }
      });
      // If error mentions Stripe key, it's not configured
      setStripeConfigured(!error?.message?.includes('Stripe'));
    } catch {
      setStripeConfigured(false);
    }
  };

  const fetchDomains = async () => {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .order('category', { ascending: true });
    
    if (!error && data) {
      setDomains(data);
    }
  };

  const fetchPurchases = async () => {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPurchases(data);
    }
  };

  const handleEditPrice = (domain: Domain) => {
    setEditingDomain(domain.id);
    setEditPrice(domain.price.toString());
  };

  const handleSavePrice = async (domainId: string) => {
    const newPrice = parseFloat(editPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('domains')
      .update({ price: newPrice })
      .eq('id', domainId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update price",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Domain price updated",
      });
      setEditingDomain(null);
      fetchDomains();
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have admin privileges</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const totalValue = domains.reduce((sum, d) => sum + Number(d.price), 0);
  const availableDomains = domains.filter(d => d.status === 'available').length;
  const completedPurchases = purchases.filter(p => p.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-cinzel text-xl font-bold text-gradient-luxury">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stripe Status Banner */}
        {!stripeConfigured && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <div>
              <p className="font-medium text-amber-500">Stripe Not Configured</p>
              <p className="text-sm text-muted-foreground">Add your Stripe API key to enable payments</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-morphism rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{domains.length}</p>
                <p className="text-sm text-muted-foreground">Total Domains</p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{availableDomains}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-luxury" />
              <div>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{completedPurchases}</p>
                <p className="text-sm text-muted-foreground">Sales</p>
              </div>
            </div>
          </div>
        </div>

        {/* Domains Table */}
        <div className="glass-morphism rounded-xl border border-primary/20 overflow-hidden mb-8">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-cinzel text-lg font-bold">Domain Inventory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium">Domain</th>
                  <th className="text-left p-4 text-sm font-medium">Category</th>
                  <th className="text-left p-4 text-sm font-medium">Price</th>
                  <th className="text-left p-4 text-sm font-medium">Status</th>
                  <th className="text-left p-4 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((domain) => (
                  <tr key={domain.id} className="border-t border-border/30 hover:bg-muted/30">
                    <td className="p-4 font-medium">{domain.name}</td>
                    <td className="p-4 text-muted-foreground">{domain.category}</td>
                    <td className="p-4">
                      {editingDomain === domain.id ? (
                        <Input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-32"
                        />
                      ) : (
                        <span className="font-bold">${Number(domain.price).toLocaleString()}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        domain.status === 'available' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {domain.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {editingDomain === domain.id ? (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSavePrice(domain.id)}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingDomain(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEditPrice(domain)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="glass-morphism rounded-xl border border-primary/20 overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-cinzel text-lg font-bold">Recent Purchases</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium">Domain</th>
                  <th className="text-left p-4 text-sm font-medium">Price</th>
                  <th className="text-left p-4 text-sm font-medium">Buyer</th>
                  <th className="text-left p-4 text-sm font-medium">Status</th>
                  <th className="text-left p-4 text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No purchases yet
                    </td>
                  </tr>
                ) : (
                  purchases.map((purchase) => (
                    <tr key={purchase.id} className="border-t border-border/30 hover:bg-muted/30">
                      <td className="p-4 font-medium">{purchase.domain_name}</td>
                      <td className="p-4">${Number(purchase.domain_price).toLocaleString()}</td>
                      <td className="p-4 text-muted-foreground">{purchase.buyer_email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          purchase.status === 'completed' 
                            ? 'bg-green-500/20 text-green-500' 
                            : purchase.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-500'
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {purchase.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(purchase.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
