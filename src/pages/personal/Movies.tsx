import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Plus, Film, Tv, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Media {
  id: string;
  title: string;
  media_type: string | null;
  poster_url: string | null;
  status: string;
  rating: number | null;
  current_episode: number | null;
  total_episodes: number | null;
}

const statusTabs = [
  { value: "all", label: "All" },
  { value: "watching", label: "Watching" },
  { value: "watchlist", label: "Watchlist" },
  { value: "completed", label: "Completed" },
];

const Movies = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) fetchMedia();
  }, [user]);

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setMedia(data || []);
    }
    setLoading(false);
  };

  const addMedia = async (type: string) => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('media')
      .insert({
        user_id: user.id,
        title: `New ${type}`,
        media_type: type,
        status: "watchlist",
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setMedia([data, ...media]);
      toast({ title: `${type} added!` });
    }
  };

  const filteredMedia = activeTab === "all" 
    ? media 
    : media.filter(m => m.status === activeTab);

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-3 h-3 ${star <= rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Movies & Series - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Movies & Series" 
        subtitle="Track your watchlist"
        breadcrumbs={[{ label: "Personal", href: "/personal/movies" }, { label: "Movies", href: "/personal/movies" }]}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.value
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => addMedia("movie")}>
              <Film className="w-4 h-4" />
              Add Movie
            </Button>
            <Button variant="outline" size="sm" onClick={() => addMedia("series")}>
              <Tv className="w-4 h-4" />
              Add Series
            </Button>
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : filteredMedia.length === 0 ? (
          <div className="bg-card/30 rounded-2xl border border-border/50 p-12 text-center">
            <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No media yet</h3>
            <p className="text-muted-foreground mb-4">Start tracking what you watch!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div 
                key={item.id}
                className="bg-card/30 rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="aspect-[2/3] bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center relative">
                  {item.media_type === "series" ? (
                    <Tv className="w-12 h-12 text-muted-foreground" />
                  ) : (
                    <Film className="w-12 h-12 text-muted-foreground" />
                  )}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-foreground text-sm truncate">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="capitalize">{item.media_type}</span>
                    {item.current_episode && item.total_episodes && (
                      <span>• Ep {item.current_episode}/{item.total_episodes}</span>
                    )}
                  </div>
                  <div className="mt-2">
                    {renderStars(item.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SubpageLayout>
    </>
  );
};

export default Movies;
