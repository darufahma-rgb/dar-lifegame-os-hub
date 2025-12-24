import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Pencil, Plus, Calendar, Smile, Frown, Meh, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  entry_date: string;
  title: string;
  content: string | null;
  mood: string | null;
  tags: string[] | null;
}

const moodIcons: Record<string, React.ElementType> = {
  happy: Smile,
  neutral: Meh,
  sad: Frown,
};

const moodColors: Record<string, string> = {
  happy: "text-neon-green",
  neutral: "text-amber-500",
  sad: "text-blue-400",
};

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("neutral");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('entry_date', { ascending: false });
    
    if (!error) setEntries(data || []);
    setLoading(false);
  };

  const addEntry = async () => {
    if (!user || !title.trim()) return;
    
    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        title,
        content,
        mood,
        entry_date: new Date().toISOString().split('T')[0],
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setEntries([data, ...entries]);
      setTitle("");
      setContent("");
      setMood("neutral");
      setShowForm(false);
      toast({ title: "Entry added!" });
    }
  };

  const deleteEntry = async (id: string) => {
    await supabase.from('journal_entries').delete().eq('id', id);
    setEntries(entries.filter(e => e.id !== id));
    toast({ title: "Entry deleted" });
  };

  return (
    <>
      <Helmet>
        <title>Journal - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Journal" 
        subtitle="Document your epic journey"
        breadcrumbs={[{ label: "Daily", href: "/daily/journal" }, { label: "Journal", href: "/daily/journal" }]}
      >
        {/* Write Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Pencil className="w-5 h-5" />
            <span>{entries.length} entries</span>
          </div>
          <Button variant="hero" onClick={() => setShowForm(!showForm)}>
            <Sparkles className="w-4 h-4" />
            New Entry
          </Button>
        </div>

        {/* New Entry Form */}
        {showForm && (
          <div className="bg-card/30 rounded-2xl border border-primary/30 p-6 mb-6">
            <Input
              placeholder="Entry title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 bg-muted/50"
            />
            <Textarea
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mb-4 bg-muted/50"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {(["happy", "neutral", "sad"] as const).map((m) => {
                  const Icon = moodIcons[m];
                  return (
                    <button
                      key={m}
                      onClick={() => setMood(m)}
                      className={`p-2 rounded-lg transition-colors ${
                        mood === m ? "bg-primary/20 border border-primary" : "bg-muted/50"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${moodColors[m]}`} />
                    </button>
                  );
                })}
              </div>
              <Button onClick={addEntry}>Save Entry</Button>
            </div>
          </div>
        )}

        {/* Entries */}
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="bg-card/30 rounded-2xl border border-border/50 p-12 text-center">
            <Pencil className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No journal entries yet. Start writing!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const MoodIcon = entry.mood ? moodIcons[entry.mood] : Meh;
              const moodColor = entry.mood ? moodColors[entry.mood] : "text-muted-foreground";
              return (
                <div 
                  key={entry.id}
                  className="bg-card/30 rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(entry.entry_date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {entry.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <MoodIcon className={`w-8 h-8 ${moodColor}`} />
                      <button 
                        onClick={() => deleteEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {entry.content && (
                    <p className="text-muted-foreground leading-relaxed">
                      {entry.content}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SubpageLayout>
    </>
  );
};

export default Journal;
