import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Calendar, Wallet, Sparkles, Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const features = [
  { icon: Sparkles, title: "AI-Powered Plans", desc: "Get personalized itineraries crafted by intelligent algorithms based on your preferences." },
  { icon: MapPin, title: "Curated Places", desc: "Discover hidden gems and top attractions hand-picked for every destination." },
  { icon: Calendar, title: "Day-by-Day View", desc: "Organized daily plans with morning, afternoon, and evening activities." },
  { icon: Wallet, title: "Budget Smart", desc: "Visual budget breakdowns with warnings so you never overspend." },
];

const testimonials = [
  { name: "Priya S.", location: "Mumbai", text: "TripCopilot planned my Goa trip perfectly. Every restaurant and beach was spot on!", rating: 5 },
  { name: "Arjun M.", location: "Delhi", text: "The budget breakdown feature saved me from overspending in Manali. Highly recommend!", rating: 5 },
  { name: "Sneha R.", location: "Bangalore", text: "Used it for a family trip to Jaipur. The kids loved every activity suggested!", rating: 5 },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Beautiful tropical coastline" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Travel Planning
            </div>
            <h1 className="mb-5 font-display text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
              Your Perfect Trip,{" "}
              <span className="text-primary">Planned in Seconds</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80">
              Tell us where you want to go, your budget, and interests — and our AI builds a personalized day-by-day itinerary just for you.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/plan">
                <Button size="lg" className="gap-2 text-base">
                  Plan Your Trip <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/saved">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  View Saved Trips
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-lg text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground">Why TripCopilot?</h2>
          <p className="text-muted-foreground">Smart features to make your travel planning effortless.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-lg text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground">Travelers Love Us</h2>
            <p className="text-muted-foreground">See what our users have to say.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-card-foreground">"{t.text}"</p>
                <div className="text-sm">
                  <span className="font-semibold text-card-foreground">{t.name}</span>
                  <span className="text-muted-foreground"> · {t.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl"
        >
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">Ready to Explore?</h2>
          <p className="mb-6 text-muted-foreground">Start planning your dream trip in just a few clicks.</p>
          <Link to="/plan">
            <Button size="lg" className="gap-2 text-base">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 AI Trip Copilot. Built with ❤️ for travelers everywhere.
        </div>
      </footer>
    </div>
  );
};

export default Index;
