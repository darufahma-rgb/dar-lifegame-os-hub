import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Plus, TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  transaction_type: string;
  category: string | null;
  transaction_date: string;
}

const Finance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('transaction_date', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setTransactions(data || []);
    }
    setLoading(false);
  };

  const addTransaction = async (type: "income" | "expense") => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        title: type === "income" ? "New Income" : "New Expense",
        amount: 0,
        transaction_type: type,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setTransactions([data, ...transactions]);
      toast({ title: "Transaction added!" });
    }
  };

  const totalIncome = transactions
    .filter(t => t.transaction_type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.transaction_type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Finance - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Finance Tracker" 
        subtitle="Manage your money like a pro"
        breadcrumbs={[{ label: "Personal", href: "/personal/finance" }, { label: "Finance", href: "/personal/finance" }]}
      >
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card/30 rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Balance</span>
            </div>
            <div className={`text-3xl font-display font-bold ${balance >= 0 ? "text-neon-green" : "text-destructive"}`}>
              {formatCurrency(balance)}
            </div>
          </div>
          <div className="bg-card/30 rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="w-5 h-5 text-neon-green" />
              <span className="text-sm">Income</span>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">
              {formatCurrency(totalIncome)}
            </div>
          </div>
          <div className="bg-card/30 rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingDown className="w-5 h-5 text-pink-400" />
              <span className="text-sm">Expenses</span>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">
              {formatCurrency(totalExpense)}
            </div>
          </div>
        </div>

        {/* Quick Add */}
        <div className="flex gap-3 mb-6">
          <Button variant="outline" onClick={() => addTransaction("income")} className="flex-1">
            <TrendingUp className="w-4 h-4 text-neon-green" />
            Add Income
          </Button>
          <Button variant="outline" onClick={() => addTransaction("expense")} className="flex-1">
            <TrendingDown className="w-4 h-4 text-pink-400" />
            Add Expense
          </Button>
        </div>

        {/* Transactions List */}
        <div className="bg-card/30 rounded-2xl border border-border/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h3 className="font-display text-lg font-semibold text-foreground">Recent Transactions</h3>
          </div>
          
          {loading ? (
            <div className="p-6 text-muted-foreground">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="p-12 text-center">
              <PiggyBank className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">No transactions yet</h3>
              <p className="text-muted-foreground">Start tracking your finances!</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {transactions.slice(0, 10).map((tx) => (
                <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4">
                    {tx.transaction_type === "income" ? (
                      <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-neon-green" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-pink-400" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-foreground">{tx.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {tx.category || "Uncategorized"} • {new Date(tx.transaction_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`font-display font-bold ${
                    tx.transaction_type === "income" ? "text-neon-green" : "text-pink-400"
                  }`}>
                    {tx.transaction_type === "income" ? "+" : "-"}{formatCurrency(Number(tx.amount))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SubpageLayout>
    </>
  );
};

export default Finance;
