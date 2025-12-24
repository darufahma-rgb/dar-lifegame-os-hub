import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Plus, BookOpen, Star, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id: string;
  title: string;
  author: string | null;
  cover_url: string | null;
  status: string;
  rating: number | null;
  current_page: number;
  total_pages: number | null;
}

const statusTabs = [
  { value: "all", label: "All" },
  { value: "reading", label: "Reading" },
  { value: "to-read", label: "To Read" },
  { value: "completed", label: "Completed" },
];

const Bookshelf = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) fetchBooks();
  }, [user]);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setBooks(data || []);
    }
    setLoading(false);
  };

  const addBook = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('books')
      .insert({
        user_id: user.id,
        title: "New Book",
        status: "to-read",
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setBooks([data, ...books]);
      toast({ title: "Book added!" });
    }
  };

  const filteredBooks = activeTab === "all" 
    ? books 
    : books.filter(b => b.status === activeTab);

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
        <title>Bookshelf - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Bookshelf" 
        subtitle="Track your reading journey"
        breadcrumbs={[{ label: "Personal", href: "/personal/bookshelf" }, { label: "Bookshelf", href: "/personal/bookshelf" }]}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab.value
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Button variant="hero" size="sm" onClick={addBook}>
            <Plus className="w-4 h-4" />
            Add Book
          </Button>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="bg-card/30 rounded-2xl border border-border/50 p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No books yet</h3>
            <p className="text-muted-foreground mb-4">Start building your reading list!</p>
            <Button variant="outline" onClick={addBook}>
              <Plus className="w-4 h-4" />
              Add a Book
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBooks.map((book) => (
              <div 
                key={book.id}
                className="bg-card/30 rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all group"
              >
                <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <BookMarked className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-foreground text-sm truncate">{book.title}</h4>
                  {book.author && (
                    <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    {renderStars(book.rating)}
                    <span className="text-xs text-muted-foreground capitalize">{book.status}</span>
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

export default Bookshelf;
