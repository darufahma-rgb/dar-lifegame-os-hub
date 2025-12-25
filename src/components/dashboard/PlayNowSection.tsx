import { Play, Plus, SkipBack, SkipForward, Music } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const playlist: Track[] = [
  { id: "1", title: "Beabriyaan X Phir Kabhi", artist: "Aashutosh Bajpayee", duration: "02:43" },
  { id: "2", title: "Tum Mile - Lofi Flip", artist: "KSW, Neeraj, Shobhani, Pritam", duration: "04:02" },
  { id: "3", title: "Pyaar Ka Sagar", artist: "Talwiinder", duration: "02:24" },
  { id: "4", title: "Sathi - Lofi Flip", artist: "Vibie", duration: "02:26" },
];

const PlayNowSection = () => {
  return (
    <section className="py-4 sm:py-8">
      <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
        <span className="text-muted-foreground">—</span> Play Now
      </h3>

      <div className="bg-card/30 rounded-lg sm:rounded-xl border border-border/50 overflow-hidden">
        {/* Album Art */}
        <div className="relative h-28 sm:h-40 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-lg sm:text-2xl font-display font-bold text-foreground mb-1">
                Lofi Bollywood Mashup
              </div>
              <div className="text-xs sm:text-sm text-foreground/80">PRO Chill</div>
            </div>
          </div>
          <button className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex items-center gap-1 text-xs text-foreground/80 hover:text-foreground transition-colors">
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Save on Spotify</span>
            <span className="sm:hidden">Save</span>
          </button>
        </div>

        {/* Player Controls */}
        <div className="p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-muted text-[10px] sm:text-xs">PREVIEW</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="text-muted-foreground hover:text-foreground">
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="w-16 sm:w-20" />
        </div>

        {/* Playlist - Compact on mobile */}
        <div className="border-t border-border/50 max-h-32 sm:max-h-none overflow-y-auto">
          {playlist.map((track, idx) => (
            <div
              key={track.id}
              className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Music className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-foreground truncate">{track.title}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground truncate">{track.artist}</div>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground flex-shrink-0 ml-2">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayNowSection;
