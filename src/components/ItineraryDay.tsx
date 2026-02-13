import { DayPlan, TripPlace } from "@/data/mockData";
import { motion } from "framer-motion";
import { Sunrise, Sun, Moon, CloudRain } from "lucide-react";

function PlaceCard({ place }: { place: TripPlace }) {
  const typeColors: Record<string, string> = {
    attraction: "bg-primary/10 text-primary",
    food: "bg-chart-3/20 text-chart-3",
    activity: "bg-accent/10 text-accent",
    culture: "bg-chart-4/15 text-chart-4",
    transport: "bg-muted text-muted-foreground",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-all hover:shadow-soft">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="font-semibold text-card-foreground">{place.name}</h4>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[place.type] || typeColors.attraction}`}>
          {place.type}
        </span>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{place.description}</p>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span>🕐 {place.bestTime}</span>
        <span>⏱️ {place.duration}</span>
      </div>
    </div>
  );
}

function TimeSlot({ icon: Icon, label, places }: { icon: React.ElementType; label: string; places: TripPlace[] }) {
  if (!places.length) return null;
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <div className="space-y-3">
        {places.map((p, i) => <PlaceCard key={i} place={p} />)}
      </div>
    </div>
  );
}

export function ItineraryDayCard({ day, index }: { day: DayPlan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card md:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-card-foreground">Day {day.day}</h3>
          <p className="text-sm text-muted-foreground">{day.date}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
          <span>{day.weather.icon}</span>
          <span>{day.weather.temp}°C</span>
          <span className="hidden sm:inline">· {day.weather.condition}</span>
        </div>
      </div>

      <div className="space-y-6">
        <TimeSlot icon={Sunrise} label="Morning" places={day.morning} />
        <TimeSlot icon={Sun} label="Afternoon" places={day.afternoon} />
        <TimeSlot icon={Moon} label="Evening" places={day.evening} />
      </div>

      {day.backupPlan && (
        <div className="mt-5 flex items-start gap-2 rounded-lg bg-secondary p-3 text-sm text-secondary-foreground">
          <CloudRain className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <span className="font-medium">Backup Plan: </span>
            {day.backupPlan}
          </div>
        </div>
      )}
    </motion.div>
  );
}
