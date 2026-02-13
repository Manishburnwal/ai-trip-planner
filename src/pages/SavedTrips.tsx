import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Calendar, Wallet, Trash2, Eye, Plus } from "lucide-react";
import { Trip, getSavedTrips, deleteTrip } from "@/data/mockData";

export default function SavedTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTrips(getSavedTrips());
  }, []);

  const handleDelete = (id: string) => {
    deleteTrip(id);
    setTrips(getSavedTrips());
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">My Trips</h1>
          <p className="text-muted-foreground">Your saved itineraries.</p>
        </div>
        <Link to="/plan">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Trip
          </Button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center"
        >
          <MapPin className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <h3 className="mb-1 text-lg font-semibold text-foreground">No trips yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">Plan your first trip to see it here.</p>
          <Link to="/plan">
            <Button>Plan a Trip</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {trips.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="font-display text-xl font-bold text-card-foreground">{trip.destination}</h3>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="rounded-lg p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {trip.days} days</span>
                <span className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5" /> ₹{trip.budget.toLocaleString()}</span>
                <span className="capitalize">{trip.travelStyle}</span>
              </div>

              {trip.interests.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {trip.interests.slice(0, 4).map((int) => (
                    <span key={int} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                      {int}
                    </span>
                  ))}
                </div>
              )}

              <Link to={`/trip/${trip.id}`}>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Eye className="h-3.5 w-3.5" /> View Itinerary
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
