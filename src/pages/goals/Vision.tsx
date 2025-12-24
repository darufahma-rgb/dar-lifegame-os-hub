import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Compass, Plus, Star, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface VisionItem {
  id: string;
  title: string;
  vision: string | null;
  icon: string;
  timeframe: string | null;
  category: string | null;
}

const Vision = () => {
  const [visionItems, setVisionItems] = useState<VisionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [vision, setVision] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) fetchVisionItems();
  }, [user]);

  const fetchVisionItems = async () => {
    const { data, error } = await supabase
      .from('vision_items')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (!error) setVisionItems(data || []);
    setLoading(false);
  };

  const addVisionItem = async () => {
    if (!user || !title.trim()) return;
    
    const { data, error } = await supabase
      .from('vision_items')
      .insert({
        user_id: user.id,
        title,
        vision,
        timeframe,
        icon: '🎯',
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setVisionItems([...visionItems, data]);
      setTitle("");
      setVision("");
      setTimeframe("");
      setShowForm(false);
      toast({ title: "Vision added!" });
    }
  };

  const deleteVisionItem = async (id: string) => {
    await supabase.from('vision_items').delete().eq('id', id);
    setVisionItems(visionItems.filter(v => v.id !== id));
    toast({ title: "Vision item deleted" });
  };

  return (
    <>
      <Helmet>
        <title>Vision Board - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Vision Board" 
        subtitle="Your north star and life direction"
        breadcrumbs={[{ label: "Goals", href: "/goals/vision" }, { label: "Vision", href: "/goals/vision" }]}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Compass className="w-5 h-5 text-primary" />
            <span>Your life vision</span>
          </div>
          <Button variant="outline" onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4" />
            Add Area
          </Button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-card/30 rounded-2xl border border-primary/30 p-6 mb-8">
            <Input
              placeholder="Vision area title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 bg-muted/50"
            />
            <Textarea
              placeholder="Describe your vision..."
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              rows={3}
              className="mb-4 bg-muted/50"
            />
            <div className="flex gap-4">
              <Input
                placeholder="Timeframe (e.g., 5 years)"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-muted/50"
              />
              <Button onClick={addVisionItem}>Add Vision</Button>
            </div>
          </div>
        )}

        {/* Main Vision Statement */}
        <div className="bg-gradient-to-br from-primary/20 via-card/50 to-secondary/20 rounded-2xl border border-primary/30 p-8 mb-8 text-center">
          <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Life Mission Statement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            "To live an epic, meaningful life filled with growth, adventure, and positive impact. 
            To help others unlock their potential by gamifying personal development."
          </p>
        </div>

        {/* Vision Areas */}
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : visionItems.length === 0 ? (
          <div className="bg-card/30 rounded-2xl border border-border/50 p-12 text-center">
            <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No vision areas yet. Add one above!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visionItems.map((item) => (
              <div 
                key={item.id}
                className="bg-card/30 rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex items-center gap-2">
                    {item.timeframe && (
                      <span className="px-2 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs">
                        {item.timeframe}
                      </span>
                    )}
                    <button 
                      onClick={() => deleteVisionItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                {item.vision && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.vision}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </SubpageLayout>
    </>
  );
};

export default Vision;
