import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Download } from "lucide-react";
import { Trip, getSavedTrips } from "@/data/mockData";
import { ItineraryDayCard } from "@/components/ItineraryDay";
import { BudgetBreakdownCard } from "@/components/BudgetBreakdown";
import { toast } from "@/hooks/use-toast";

export default function TripView() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const found = getSavedTrips().find((t) => t.id === id);
    setTrip(found || null);
  }, [id]);

  if (!trip) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Trip not found</h2>
        <Link to="/saved"><Button variant="outline">Back to Trips</Button></Link>
      </div>
    );
  }

  const handleShare = () => {
    // TODO: Replace with real share link generation
    const fakeLink = `${window.location.origin}/shared/${trip.id}`;
    navigator.clipboard.writeText(fakeLink);
    toast({ title: "Link copied!", description: "Share this link with friends." });
  };

  const handleDownload = () => {
    // TODO: Replace with real PDF generation
    toast({ title: "Download started", description: "PDF generation coming soon!" });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/saved" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to trips
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground">{trip.destination}</h1>
          <p className="text-muted-foreground">
            {trip.days} days · {trip.travelStyle} · {trip.pace} pace · ₹{trip.budget.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-3.5 w-3.5" /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-3.5 w-3.5" /> Download
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {trip.itinerary.map((day, i) => (
            <ItineraryDayCard key={day.day} day={day} index={i} />
          ))}
        </div>
        <div>
          <BudgetBreakdownCard budget={trip.budgetBreakdown} />
        </div>
      </div>
    </div>
  );
}
