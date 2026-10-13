/**
 * Offline motivational quotes for daily discipline and growth.
 * Fully offline, curated for discipline, productivity, and resilience.
 */
export const OFFLINE_QUOTES = [
  { quote: "Small disciplines repeated with consistency every day lead to great achievements.", author: "John C. Maxwell" },
  { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant" },
  { quote: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { quote: "Action isn't just the effect of motivation; it's also the cause of it.", author: "Mark Manson" },
  { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { quote: "Discipline equals freedom.", author: "Jocko Willink" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" }
];

export function getDailyQuote() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = Math.abs(dayOfYear) % OFFLINE_QUOTES.length;
  return OFFLINE_QUOTES[index];
}
