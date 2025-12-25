import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Check, Plus, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ShoppingItem {
  id: string;
  title: string;
  completed: boolean | null;
}

const ShoppingListWidget = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (user) {
      fetchShoppingList();
    }
  }, [user]);

  const fetchShoppingList = async () => {
    if (!user) return;

    try {
      // Using tasks with category "Shopping" as shopping list
      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, completed")
        .eq("user_id", user.id)
        .ilike("description", "%shopping%")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = async (itemId: string, completed: boolean | null) => {
    if (!user) return;

    try {
      await supabase
        .from("tasks")
        .update({ completed: !completed })
        .eq("id", itemId);

      setItems(items.map(item => 
        item.id === itemId ? { ...item, completed: !completed } : item
      ));
    } catch (error) {
      console.error("Error toggling item:", error);
    }
  };

  const addItem = async () => {
    if (!user || !newItem.trim()) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          title: newItem.trim(),
          user_id: user.id,
          description: "shopping",
          priority: "low",
        })
        .select()
        .single();

      if (error) throw error;
      setItems([{ id: data.id, title: data.title, completed: false }, ...items]);
      setNewItem("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const checkedCount = items.filter(i => i.completed).length;

  return (
    <div className="bg-card/30 rounded-xl border border-border/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          <h4 className="font-display text-sm font-semibold text-foreground">Shopping List</h4>
        </div>
        <span className="text-xs text-muted-foreground">{checkedCount}/{items.length}</span>
      </div>

      {/* Quick Add */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add item..."
          className="flex-1 bg-muted/30 border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
        />
        <button
          onClick={addItem}
          className="p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 bg-muted/30 rounded animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-2 text-muted-foreground text-sm">
          <p>No items yet</p>
        </div>
      ) : (
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id, item.completed)}
              className="w-full flex items-center gap-2 py-1 hover:bg-muted/20 rounded px-1 -mx-1 transition-colors text-left"
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                item.completed 
                  ? "bg-primary border-primary" 
                  : "border-muted-foreground/50"
              }`}>
                {item.completed && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
              <span className={`text-sm truncate ${
                item.completed ? "line-through text-muted-foreground" : "text-foreground"
              }`}>
                {item.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingListWidget;
