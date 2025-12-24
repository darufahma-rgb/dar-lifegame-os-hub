import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { useState, useEffect } from "react";
import { Plus, Plane, Calendar, MapPin, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface TravelPlan {
  id: string;
  destination: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  currency: string;
  status: string;
}

const statusColors: Record<string, string> = {
  planning: "bg-amber-500/20 text-amber-400",
  booked: "bg-blue-500/20 text-blue-400",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const TravelPlanner = () => {
  const [trips, setTrips] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) fetchTrips();
  }, [user]);

  const fetchTrips = async () => {
    const { data, error } = await supabase
      .from('travel_plans')
      .select('*')
      .order('start_date', { ascending: true });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setTrips(data || []);
    }
    setLoading(false);
  };

  const addTrip = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('travel_plans')
      .insert({
        user_id: user.id,
        destination: "New Destination",
        status: "planning",
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setTrips([...trips, data]);
      toast({ title: "Trip added!" });
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency || 'IDR',
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Travel Planner - Dar Lifegame OS</title>
      </Helmet>

      <SubpageLayout 
        title="Travel Planner" 
        subtitle="Plan your adventures"
        breadcrumbs={[{ label: "Planners", href: "/planners/travel" }, { label: "Travel", href: "/planners/travel" }]}
      >
        {/* Add Trip Button */}
        <div className="flex justify-end mb-8">
          <Button variant="hero" onClick={addTrip}>
            <Plus className="w-4 h-4" />
            New Trip
          </Button>
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-muted-foreground">Loading...</div>
          ) : trips.length === 0 ? (
            <div className="bg-card/30 rounded-2xl border border-border/50 p-12 text-center">
              <Plane className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">No trips planned</h3>
              <p className="text-muted-foreground mb-4">Start planning your next adventure!</p>
              <Button variant="outline" onClick={addTrip}>
                <Plus className="w-4 h-4" />
                Plan a Trip
              </Button>
            </div>
          ) : (
            trips.map((trip) => (
              <div 
                key={trip.id}
                className="bg-card/30 rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {trip.destination}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${statusColors[trip.status]}`}>
                    {trip.status}
                  </span>
                </div>
                
                {trip.description && (
                  <p className="text-muted-foreground mb-4">{trip.description}</p>
                )}

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  {trip.start_date && (
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(trip.start_date).toLocaleDateString()}
                      {trip.end_date && ` - ${new Date(trip.end_date).toLocaleDateString()}`}
                    </span>
                  )}
                  {trip.budget && (
                    <span className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      {formatCurrency(trip.budget, trip.currency)}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </SubpageLayout>
    </>
  );
};

export default TravelPlanner;
