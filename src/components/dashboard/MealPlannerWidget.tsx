import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, UtensilsCrossed, Coffee, Sun, Moon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface MealPlan {
  id: string;
  title: string;
  meal_type: string | null;
  completed: boolean | null;
}

const mealTypeIcons: Record<string, React.ElementType> = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: UtensilsCrossed,
};

const MealPlannerWidget = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (user) {
      fetchMeals();
    }
  }, [user]);

  const fetchMeals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("meal_plans")
        .select("id, title, meal_type, completed")
        .eq("user_id", user.id)
        .eq("meal_date", today)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMeals(data || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMeal = async (mealId: string, completed: boolean | null) => {
    if (!user) return;

    try {
      await supabase
        .from("meal_plans")
        .update({ completed: !completed })
        .eq("id", mealId);

      setMeals(meals.map(m => 
        m.id === mealId ? { ...m, completed: !completed } : m
      ));
    } catch (error) {
      console.error("Error toggling meal:", error);
    }
  };

  const mealOrder = ["breakfast", "lunch", "dinner", "snack"];
  const sortedMeals = [...meals].sort((a, b) => {
    const aIndex = mealOrder.indexOf(a.meal_type || "");
    const bIndex = mealOrder.indexOf(b.meal_type || "");
    return aIndex - bIndex;
  });

  return (
    <div className="bg-card/30 rounded-lg sm:rounded-xl border border-border/50 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground">Meals</h4>
        <Link to="/planners/meal" className="text-muted-foreground hover:text-primary">
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-1.5 sm:space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 sm:h-12 bg-muted/30 rounded animate-pulse" />
          ))}
        </div>
      ) : meals.length === 0 ? (
        <div className="text-center py-3 sm:py-4 text-muted-foreground text-xs sm:text-sm">
          <p>No meals</p>
          <Link to="/planners/meal" className="text-primary hover:underline">Plan</Link>
        </div>
      ) : (
        <div className="space-y-1.5 sm:space-y-2">
          {sortedMeals.slice(0, 3).map((meal) => {
            const IconComponent = mealTypeIcons[meal.meal_type || "snack"] || UtensilsCrossed;
            return (
              <button
                key={meal.id}
                onClick={() => toggleMeal(meal.id, meal.completed)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-md sm:rounded-lg transition-all text-left ${
                  meal.completed 
                    ? "bg-primary/10 border border-primary/20" 
                    : "bg-muted/20 border border-transparent hover:border-border/50"
                }`}
              >
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 ${
                  meal.completed ? "bg-primary/20" : "bg-muted/50"
                }`}>
                  <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${meal.completed ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs sm:text-sm truncate ${meal.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {meal.title}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground capitalize">
                    {meal.meal_type || "Meal"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MealPlannerWidget;
