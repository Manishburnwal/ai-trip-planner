import { BudgetBreakdown as BudgetData } from "@/data/mockData";
import { motion } from "framer-motion";

const categories = [
  { key: "stay" as const, label: "Accommodation", color: "bg-chart-1", emoji: "🏨" },
  { key: "food" as const, label: "Food & Dining", color: "bg-chart-2", emoji: "🍽️" },
  { key: "transport" as const, label: "Transport", color: "bg-chart-4", emoji: "🚗" },
  { key: "activities" as const, label: "Activities", color: "bg-chart-3", emoji: "🎯" },
  { key: "misc" as const, label: "Miscellaneous", color: "bg-chart-5", emoji: "📦" },
];

export function BudgetBreakdownCard({ budget }: { budget: BudgetData }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h3 className="mb-1 font-display text-xl font-bold text-card-foreground">Budget Breakdown</h3>
      <p className="mb-6 text-sm text-muted-foreground">Estimated ₹{budget.total.toLocaleString()} total</p>

      <div className="space-y-4">
        {categories.map((cat, i) => {
          const value = budget[cat.key];
          const pct = Math.round((value / budget.total) * 100);
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-card-foreground">
                  <span>{cat.emoji}</span> {cat.label}
                </span>
                <span className="text-muted-foreground">₹{value.toLocaleString()} ({pct}%)</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className={`h-full rounded-full ${cat.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {budget.total < 5000 && (
        <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          ⚠️ This budget seems quite low. Consider increasing it for a comfortable trip.
        </div>
      )}
    </div>
  );
}
