import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, MapPin, Sparkles } from "lucide-react";
import {
  INTERESTS, TRAVEL_STYLES, DESTINATIONS,
  TripFormData, generateMockItinerary, saveTrip, Trip,
} from "@/data/mockData";
import { ItineraryDayCard } from "@/components/ItineraryDay";
import { BudgetBreakdownCard } from "@/components/BudgetBreakdown";

const STEPS = ["Destination", "Preferences", "Review"];

export default function PlanTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState<Trip | null>(null);
  const [form, setForm] = useState<TripFormData>({
    destination: "",
    days: 3,
    startDate: "",
    budget: 15000,
    interests: [],
    travelStyle: "solo",
    pace: "relaxed",
  });

  const update = (partial: Partial<TripFormData>) => setForm((f) => ({ ...f, ...partial }));

  const toggleInterest = (id: string) => {
    update({
      interests: form.interests.includes(id)
        ? form.interests.filter((i) => i !== id)
        : [...form.interests, id],
    });
  };

  // TODO: Replace with real API call
  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000)); // Simulate API delay
    const trip = generateMockItinerary(form);
    setGeneratedTrip(trip);
    setLoading(false);
  };

  const handleSave = () => {
    if (generatedTrip) {
      saveTrip(generatedTrip);
      navigate("/saved");
    }
  };

  if (generatedTrip) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Your {generatedTrip.destination} Itinerary
              </h1>
              <p className="text-muted-foreground">
                {generatedTrip.days} days · {generatedTrip.travelStyle} · {generatedTrip.pace} pace
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setGeneratedTrip(null); setStep(0); }}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Modify
              </Button>
              <Button onClick={handleSave}>Save Trip</Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {generatedTrip.itinerary.map((day, i) => (
                <ItineraryDayCard key={day.day} day={day} index={i} />
              ))}
            </div>
            <div className="space-y-6">
              <BudgetBreakdownCard budget={generatedTrip.budgetBreakdown} />

              {/* Map Placeholder */}
              <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-border bg-card shadow-card">
                <MapPin className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Map coming soon</p>
                {/* TODO: Integrate real map API (Google Maps / Mapbox) */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex justify-between text-sm text-muted-foreground">
          {STEPS.map((s, i) => (
            <span key={s} className={i <= step ? "font-medium text-primary" : ""}>{s}</span>
          ))}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-1 font-display text-2xl font-bold text-foreground">Where are you headed?</h2>
                <p className="text-sm text-muted-foreground">Pick a destination or type your own.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {DESTINATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => update({ destination: d })}
                    className={`rounded-xl border-2 p-4 text-left text-sm font-medium transition-all ${
                      form.destination === d
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-card-foreground hover:border-primary/30"
                    }`}
                  >
                    <MapPin className="mb-1 h-4 w-4" />
                    {d}
                  </button>
                ))}
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Or type a destination</Label>
                <Input
                  value={form.destination}
                  onChange={(e) => update({ destination: e.target.value })}
                  placeholder="e.g. Shimla, Varanasi..."
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Number of Days</Label>
                  <Input
                    type="number"
                    min={1}
                    max={14}
                    value={form.days}
                    onChange={(e) => update({ days: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Start Date</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => update({ startDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-1 font-display text-2xl font-bold text-foreground">What are you into?</h2>
                <p className="text-sm text-muted-foreground">Select your interests and travel style.</p>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium text-foreground">Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((int) => (
                    <button
                      key={int.id}
                      onClick={() => toggleInterest(int.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        form.interests.includes(int.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-card-foreground hover:border-primary/30"
                      }`}
                    >
                      {int.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium text-foreground">Travel Style</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {TRAVEL_STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => update({ travelStyle: s.id })}
                      className={`rounded-xl border-2 p-3 text-center text-sm font-medium transition-all ${
                        form.travelStyle === s.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-card text-card-foreground hover:border-primary/30"
                      }`}
                    >
                      <span className="mb-1 block text-xl">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-medium text-foreground">Pace</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["relaxed", "packed"].map((p) => (
                    <button
                      key={p}
                      onClick={() => update({ pace: p })}
                      className={`rounded-xl border-2 p-3 text-center text-sm font-medium capitalize transition-all ${
                        form.pace === p
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-card text-card-foreground hover:border-primary/30"
                      }`}
                    >
                      {p === "relaxed" ? "😌 Relaxed" : "⚡ Packed"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Budget (₹)</Label>
                <Input
                  type="number"
                  min={1000}
                  step={1000}
                  value={form.budget}
                  onChange={(e) => update({ budget: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-1 font-display text-2xl font-bold text-foreground">Review Your Trip</h2>
                <p className="text-sm text-muted-foreground">Confirm the details before we generate your itinerary.</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Destination", value: form.destination || "Not set" },
                    { label: "Duration", value: `${form.days} days` },
                    { label: "Start Date", value: form.startDate || "Flexible" },
                    { label: "Budget", value: `₹${form.budget.toLocaleString()}` },
                    { label: "Style", value: form.travelStyle },
                    { label: "Pace", value: form.pace },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                      <p className="mt-0.5 text-sm font-medium capitalize text-card-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                {form.interests.length > 0 && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Interests</p>
                    <div className="flex flex-wrap gap-1.5">
                      {form.interests.map((id) => (
                        <span key={id} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {INTERESTS.find((i) => i.id === id)?.label || id}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        {step < 2 ? (
          <Button onClick={() => setStep(step + 1)} disabled={step === 0 && !form.destination}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleGenerate} disabled={loading || !form.destination}>
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" /> Generate Itinerary</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
