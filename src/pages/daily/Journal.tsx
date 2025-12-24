import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState } from "react";
import { Pencil, Plus, Calendar, Smile, Frown, Meh, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: "happy" | "neutral" | "sad";
  tags: string[];
}

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: "2024-02-14",
    title: "A Great Day!",
    content: "Had an amazing workout this morning and finished my project ahead of schedule. Feeling accomplished!",
    mood: "happy",
    tags: ["productivity", "fitness"],
  },
  {
    id: "2",
    date: "2024-02-13",
    title: "Reflections on Growth",
    content: "Reading 'Atomic Habits' and realizing how small changes can lead to big results. Need to be more patient with myself.",
    mood: "neutral",
    tags: ["learning", "self-improvement"],
  },
  {
    id: "3",
    date: "2024-02-12",
    title: "Challenging Day",
    content: "Work was stressful today. Client meeting didn't go well but learned valuable lessons about preparation.",
    mood: "sad",
    tags: ["work", "lessons"],
  },
];

const moodIcons = {
  happy: Smile,
  neutral: Meh,
  sad: Frown,
};

const moodColors = {
  happy: "text-neon-green",
  neutral: "text-amber-500",
  sad: "text-blue-400",
};

const Journal = () => {
  const [entries] = useState(mockEntries);

  return (
    <>
      <Helmet>
        <title>Journal - Dar Lifegame OS</title>
        <meta name="description" content="Document your journey with Dar Lifegame OS Journal." />
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
          <Button variant="hero" size="default">
            <Sparkles className="w-4 h-4" />
            New Entry
          </Button>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry) => {
            const MoodIcon = moodIcons[entry.mood];
            return (
              <div 
                key={entry.id}
                className="bg-card/30 rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>
                  </div>
                  <MoodIcon className={`w-8 h-8 ${moodColors[entry.mood]}`} />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {entry.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Entry Button */}
        <button className="w-full mt-6 py-4 border-2 border-dashed border-border/50 rounded-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Write new journal entry
        </button>
      </SubpageLayout>
    </>
  );
};

export default Journal;
