import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Plus, UtensilsCrossed, Coffee, Sun, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface MealPlan {
  id: string;
  meal_date: string;
  meal_type: string;
  title: string;
  recipe: string | null;
  calories: number | null;
  notes: string | null;
  completed: boolean;
}

const mealTypeIcons: Record<string, React.ElementType> = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: UtensilsCrossed,
};

const MealPlanner = () => {
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user) fetchMeals();
  }, [user]);

  const fetchMeals = async () => {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .order('meal_date', { ascending: true });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setMeals(data || []);
    }
    setLoading(false);
  };

  const addMeal = async (mealType: string) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('meal_plans')
      .insert({
        user_id: user.id,
        meal_date: today,
        meal_type: mealType,
        title: `New ${mealType}`,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setMeals([...meals, data]);
      toast({ title: "Meal added!" });
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from('meal_plans')
      .update({ completed: !completed })
      .eq('id', id);

    if (!error) {
      setMeals(meals.map(m => m.id === id ? { ...m, completed: !completed } : m));
    }
  };

  const todayMeals = meals.filter(m => m.meal_date === today);

  return (
    <>
      <Helmet>
        <title>Meal Planner - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Meal Planner" 
        subtitle="Plan your daily nutrition"
        breadcrumbs={[{ label: "Planners", href: "/planners/meal" }, { label: "Meal", href: "/planners/meal" }]}
      >
        {/* Quick Add */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["breakfast", "lunch", "dinner", "snack"].map((type) => {
            const Icon = mealTypeIcons[type];
            return (
              <button
                key={type}
                onClick={() => addMeal(type)}
                className="bg-card/30 rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-all flex items-center gap-3"
              >
                <Icon className="w-6 h-6 text-primary" />
                <span className="capitalize text-foreground">{type}</span>
                <Plus className="w-4 h-4 text-muted-foreground ml-auto" />
              </button>
            );
          })}
        </div>

        {/* Today's Meals */}
        <div className="bg-card/30 rounded-2xl border border-border/50 p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Today's Meals</h3>
          
          {loading ? (
            <div className="text-muted-foreground">Loading...</div>
          ) : todayMeals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No meals planned for today</p>
              <p className="text-sm">Click a meal type above to add one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayMeals.map((meal) => {
                const Icon = mealTypeIcons[meal.meal_type] || UtensilsCrossed;
                return (
                  <div 
                    key={meal.id}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{meal.title}</div>
                      <div className="text-sm text-muted-foreground capitalize">{meal.meal_type}</div>
                    </div>
                    {meal.calories && (
                      <span className="text-sm text-muted-foreground">{meal.calories} cal</span>
                    )}
                    <button
                      onClick={() => toggleComplete(meal.id, meal.completed)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        meal.completed ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {meal.completed && <Check className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SubpageLayout>
    </>
  );
};

export default MealPlanner;
