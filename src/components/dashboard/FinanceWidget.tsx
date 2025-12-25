import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { startOfMonth, endOfMonth, format, subMonths } from "date-fns";

interface FinanceSummary {
  income: number;
  expense: number;
  balance: number;
  incomeChange: number;
  expenseChange: number;
}

const FinanceWidget = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<FinanceSummary>({
    income: 0,
    expense: 0,
    balance: 0,
    incomeChange: 0,
    expenseChange: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFinanceSummary();
    }
  }, [user]);

  const fetchFinanceSummary = async () => {
    if (!user) return;

    try {
      const now = new Date();
      const thisMonthStart = format(startOfMonth(now), "yyyy-MM-dd");
      const thisMonthEnd = format(endOfMonth(now), "yyyy-MM-dd");
      const lastMonthStart = format(startOfMonth(subMonths(now, 1)), "yyyy-MM-dd");
      const lastMonthEnd = format(endOfMonth(subMonths(now, 1)), "yyyy-MM-dd");

      // This month transactions
      const { data: thisMonthData, error: thisMonthError } = await supabase
        .from("transactions")
        .select("amount, transaction_type")
        .eq("user_id", user.id)
        .gte("transaction_date", thisMonthStart)
        .lte("transaction_date", thisMonthEnd);

      if (thisMonthError) throw thisMonthError;

      // Last month transactions
      const { data: lastMonthData, error: lastMonthError } = await supabase
        .from("transactions")
        .select("amount, transaction_type")
        .eq("user_id", user.id)
        .gte("transaction_date", lastMonthStart)
        .lte("transaction_date", lastMonthEnd);

      if (lastMonthError) throw lastMonthError;

      // Calculate this month
      const thisMonthIncome = (thisMonthData || [])
        .filter(t => t.transaction_type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const thisMonthExpense = (thisMonthData || [])
        .filter(t => t.transaction_type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      // Calculate last month
      const lastMonthIncome = (lastMonthData || [])
        .filter(t => t.transaction_type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const lastMonthExpense = (lastMonthData || [])
        .filter(t => t.transaction_type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      // Calculate changes
      const incomeChange = lastMonthIncome > 0 
        ? ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100 
        : 0;
      
      const expenseChange = lastMonthExpense > 0 
        ? ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100 
        : 0;

      setSummary({
        income: thisMonthIncome,
        expense: thisMonthExpense,
        balance: thisMonthIncome - thisMonthExpense,
        incomeChange,
        expenseChange,
      });
    } catch (error) {
      console.error("Error fetching finance summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-card/30 rounded-xl border border-border/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" />
          <h4 className="font-display text-sm font-semibold text-foreground">Finance</h4>
        </div>
        <Link to="/personal/finance" className="text-muted-foreground hover:text-primary">
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-muted/30 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Income */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-green-500/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-400">
                {formatCurrency(summary.income)}
              </div>
              {summary.incomeChange !== 0 && (
                <div className={`text-xs ${summary.incomeChange > 0 ? "text-green-400" : "text-red-400"}`}>
                  {summary.incomeChange > 0 ? "+" : ""}{summary.incomeChange.toFixed(1)}%
                </div>
              )}
            </div>
          </div>

          {/* Expense */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-red-500/10">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-xs text-muted-foreground">Expense</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-red-400">
                {formatCurrency(summary.expense)}
              </div>
              {summary.expenseChange !== 0 && (
                <div className={`text-xs ${summary.expenseChange < 0 ? "text-green-400" : "text-red-400"}`}>
                  {summary.expenseChange > 0 ? "+" : ""}{summary.expenseChange.toFixed(1)}%
                </div>
              )}
            </div>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-xs text-muted-foreground">Balance</span>
            <div className={`text-sm font-bold ${summary.balance >= 0 ? "text-primary" : "text-red-400"}`}>
              {formatCurrency(summary.balance)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceWidget;
