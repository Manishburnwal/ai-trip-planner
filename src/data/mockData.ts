export interface TripPlace {
  name: string;
  description: string;
  bestTime: string;
  duration: string;
  type: "attraction" | "food" | "activity" | "transport" | "culture";
}

export interface DayPlan {
  day: number;
  date: string;
  weather: { temp: number; condition: string; icon: string };
  morning: TripPlace[];
  afternoon: TripPlace[];
  evening: TripPlace[];
  backupPlan?: string;
}

export interface BudgetBreakdown {
  stay: number;
  food: number;
  transport: number;
  activities: number;
  misc: number;
  total: number;
}

export interface Trip {
  id: string;
  destination: string;
  days: number;
  startDate: string;
  budget: number;
  interests: string[];
  travelStyle: string;
  pace: string;
  itinerary: DayPlan[];
  budgetBreakdown: BudgetBreakdown;
  createdAt: string;
}

export interface TripFormData {
  destination: string;
  days: number;
  startDate: string;
  budget: number;
  interests: string[];
  travelStyle: string;
  pace: string;
}

export const INTERESTS = [
  { id: "food", label: "🍜 Food", emoji: "🍜" },
  { id: "beaches", label: "🏖️ Beaches", emoji: "🏖️" },
  { id: "adventure", label: "🧗 Adventure", emoji: "🧗" },
  { id: "culture", label: "🏛️ Culture", emoji: "🏛️" },
  { id: "nightlife", label: "🎶 Nightlife", emoji: "🎶" },
  { id: "chill", label: "😌 Chill", emoji: "😌" },
  { id: "shopping", label: "🛍️ Shopping", emoji: "🛍️" },
  { id: "nature", label: "🌿 Nature", emoji: "🌿" },
];

export const TRAVEL_STYLES = [
  { id: "solo", label: "Solo", icon: "🧍" },
  { id: "couple", label: "Couple", icon: "💑" },
  { id: "friends", label: "Friends", icon: "👯" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
];

export const DESTINATIONS = ["Goa", "Manali", "Jaipur", "Kerala", "Rishikesh", "Udaipur"];

// TODO: Replace with real API call to backend
export function generateMockItinerary(data: TripFormData): Trip {
  const itineraryMap: Record<string, DayPlan[]> = {
    Goa: generateGoaItinerary(data.days),
    Manali: generateManaliItinerary(data.days),
    Jaipur: generateJaipurItinerary(data.days),
  };

  const itinerary = itineraryMap[data.destination] || generateGoaItinerary(data.days);
  const budgetBreakdown = generateBudgetBreakdown(data.budget);

  return {
    id: Date.now().toString(),
    ...data,
    itinerary,
    budgetBreakdown,
    createdAt: new Date().toISOString(),
  };
}

function generateBudgetBreakdown(total: number): BudgetBreakdown {
  return {
    stay: Math.round(total * 0.35),
    food: Math.round(total * 0.2),
    transport: Math.round(total * 0.15),
    activities: Math.round(total * 0.2),
    misc: Math.round(total * 0.1),
    total,
  };
}

function generateGoaItinerary(days: number): DayPlan[] {
  const allDays: DayPlan[] = [
    {
      day: 1, date: "Day 1",
      weather: { temp: 32, condition: "Sunny", icon: "☀️" },
      morning: [{ name: "Baga Beach", description: "Start your Goa trip at the iconic Baga Beach. Enjoy water sports or just relax by the shore.", bestTime: "7 AM – 10 AM", duration: "2-3 hrs", type: "attraction" }],
      afternoon: [{ name: "Fort Aguada", description: "Explore this 17th-century Portuguese fort with panoramic sea views.", bestTime: "3 PM – 5 PM", duration: "1.5 hrs", type: "attraction" }],
      evening: [{ name: "Thalassa Restaurant", description: "Greek-inspired dining with sunset views over the Arabian Sea.", bestTime: "7 PM – 9 PM", duration: "2 hrs", type: "food" }],
      backupPlan: "If rainy, visit the Goa State Museum or Casino Pride.",
    },
    {
      day: 2, date: "Day 2",
      weather: { temp: 30, condition: "Partly Cloudy", icon: "⛅" },
      morning: [{ name: "Old Goa Churches", description: "Visit the Basilica of Bom Jesus and Se Cathedral — UNESCO World Heritage Sites.", bestTime: "9 AM – 12 PM", duration: "3 hrs", type: "culture" }],
      afternoon: [{ name: "Spice Plantation Tour", description: "Walk through aromatic spice gardens and enjoy a traditional Goan lunch.", bestTime: "1 PM – 4 PM", duration: "3 hrs", type: "activity" }],
      evening: [{ name: "Anjuna Flea Market", description: "Browse handicrafts, clothes, and street food at this vibrant night market.", bestTime: "6 PM – 9 PM", duration: "2-3 hrs", type: "activity" }],
    },
    {
      day: 3, date: "Day 3",
      weather: { temp: 31, condition: "Sunny", icon: "☀️" },
      morning: [{ name: "Dudhsagar Falls", description: "Witness the magnificent 4-tiered waterfall surrounded by lush forest.", bestTime: "7 AM – 12 PM", duration: "5 hrs", type: "attraction" }],
      afternoon: [{ name: "Palolem Beach", description: "South Goa's crescent-shaped paradise, perfect for kayaking and dolphin spotting.", bestTime: "2 PM – 5 PM", duration: "3 hrs", type: "attraction" }],
      evening: [{ name: "Silent Noise Party", description: "Experience Goa's unique silent disco on the beach under the stars.", bestTime: "9 PM – 12 AM", duration: "3 hrs", type: "activity" }],
      backupPlan: "Visit Chapora Fort for sunset views instead.",
    },
  ];
  return allDays.slice(0, days);
}

function generateManaliItinerary(days: number): DayPlan[] {
  const allDays: DayPlan[] = [
    {
      day: 1, date: "Day 1",
      weather: { temp: 15, condition: "Clear", icon: "🏔️" },
      morning: [{ name: "Hadimba Temple", description: "Ancient cave temple set amidst towering cedar forests.", bestTime: "8 AM – 10 AM", duration: "1.5 hrs", type: "culture" }],
      afternoon: [{ name: "Solang Valley", description: "Adventure hub for paragliding, zorbing, and stunning valley views.", bestTime: "12 PM – 4 PM", duration: "4 hrs", type: "activity" }],
      evening: [{ name: "Mall Road", description: "Stroll through Manali's lively market street for shopping and street food.", bestTime: "6 PM – 9 PM", duration: "2-3 hrs", type: "activity" }],
    },
    {
      day: 2, date: "Day 2",
      weather: { temp: 12, condition: "Snowy", icon: "❄️" },
      morning: [{ name: "Rohtang Pass", description: "Drive to the legendary high-altitude pass with breathtaking snow-capped views.", bestTime: "6 AM – 12 PM", duration: "6 hrs", type: "attraction" }],
      afternoon: [{ name: "Old Manali", description: "Explore bohemian cafés, bakeries, and rustic charm of old Manali village.", bestTime: "2 PM – 5 PM", duration: "3 hrs", type: "food" }],
      evening: [{ name: "Riverside Bonfire", description: "End the day with a bonfire by the Beas River at your camp/hotel.", bestTime: "7 PM – 10 PM", duration: "3 hrs", type: "activity" }],
      backupPlan: "If Rohtang is closed, visit Kothi and Gulaba viewpoints.",
    },
    {
      day: 3, date: "Day 3",
      weather: { temp: 18, condition: "Sunny", icon: "☀️" },
      morning: [{ name: "Jogini Falls Trek", description: "A moderate 2km trek through pine forests to a beautiful waterfall.", bestTime: "7 AM – 11 AM", duration: "4 hrs", type: "activity" }],
      afternoon: [{ name: "Naggar Castle", description: "Medieval castle-turned-hotel with art gallery and Himalayan panoramas.", bestTime: "1 PM – 3 PM", duration: "2 hrs", type: "culture" }],
      evening: [{ name: "Lazy Dog Lounge", description: "Chill café with live music and mountain views, perfect for winding down.", bestTime: "6 PM – 9 PM", duration: "2-3 hrs", type: "food" }],
    },
  ];
  return allDays.slice(0, days);
}

function generateJaipurItinerary(days: number): DayPlan[] {
  const allDays: DayPlan[] = [
    {
      day: 1, date: "Day 1",
      weather: { temp: 35, condition: "Hot & Sunny", icon: "🌞" },
      morning: [{ name: "Amber Fort", description: "Majestic hilltop fort with intricate mirror work and elephant rides.", bestTime: "8 AM – 11 AM", duration: "3 hrs", type: "attraction" }],
      afternoon: [{ name: "Hawa Mahal", description: "The iconic 'Palace of Winds' with 953 small windows and pink sandstone façade.", bestTime: "12 PM – 2 PM", duration: "1.5 hrs", type: "attraction" }],
      evening: [{ name: "Chokhi Dhani", description: "Rajasthani village experience with folk dances, puppet shows, and royal thali dinner.", bestTime: "6 PM – 10 PM", duration: "4 hrs", type: "food" }],
    },
    {
      day: 2, date: "Day 2",
      weather: { temp: 34, condition: "Sunny", icon: "☀️" },
      morning: [{ name: "City Palace", description: "A stunning blend of Rajasthani and Mughal architecture in the heart of Jaipur.", bestTime: "9 AM – 12 PM", duration: "3 hrs", type: "culture" }],
      afternoon: [{ name: "Jantar Mantar", description: "UNESCO-listed astronomical observation site with the world's largest stone sundial.", bestTime: "1 PM – 3 PM", duration: "1.5 hrs", type: "attraction" }],
      evening: [{ name: "Johari Bazaar", description: "Famous for Rajasthani jewelry, textiles, and aromatic street food.", bestTime: "5 PM – 8 PM", duration: "3 hrs", type: "activity" }],
      backupPlan: "If too hot, spend the afternoon at Jal Mahal (Water Palace) viewpoint.",
    },
    {
      day: 3, date: "Day 3",
      weather: { temp: 33, condition: "Clear", icon: "☀️" },
      morning: [{ name: "Nahargarh Fort", description: "Hilltop fort with the best panoramic views of Jaipur's pink cityscape.", bestTime: "7 AM – 10 AM", duration: "2.5 hrs", type: "attraction" }],
      afternoon: [{ name: "Albert Hall Museum", description: "Indo-Saracenic architecture housing an eclectic collection of art and artifacts.", bestTime: "12 PM – 3 PM", duration: "2 hrs", type: "culture" }],
      evening: [{ name: "Tapri Central", description: "Iconic rooftop chai café with views of the Hawa Mahal lit up at night.", bestTime: "6 PM – 9 PM", duration: "2 hrs", type: "food" }],
    },
  ];
  return allDays.slice(0, days);
}

export function saveTrip(trip: Trip): void {
  const trips = getSavedTrips();
  trips.push(trip);
  localStorage.setItem("ai-trip-copilot-trips", JSON.stringify(trips));
}

export function getSavedTrips(): Trip[] {
  const stored = localStorage.getItem("ai-trip-copilot-trips");
  return stored ? JSON.parse(stored) : [];
}

export function deleteTrip(id: string): void {
  const trips = getSavedTrips().filter((t) => t.id !== id);
  localStorage.setItem("ai-trip-copilot-trips", JSON.stringify(trips));
}
