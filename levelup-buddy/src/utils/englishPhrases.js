/**
 * Curated offline collection of modern conversational & professional English phrases,
 * idioms, and daily speaking challenges to build real-world fluency.
 */
export const DAILY_ENGLISH_PHRASES = [
  {
    phrase: "Hit the ground running",
    meaning: "Start an activity immediately with great energy and enthusiasm.",
    example: "With our new productivity routine, we can hit the ground running every morning.",
    challenge: "Speak for 1 minute about how you plan to hit the ground running with your career goals."
  },
  {
    phrase: "In a nutshell",
    meaning: "To summarize something in very few clear words.",
    example: "In a nutshell, consistent daily habits beat occasional bursts of hard work.",
    challenge: "Explain your current coding project or routine in a nutshell out loud."
  },
  {
    phrase: "Touch base",
    meaning: "To briefly make contact or reconnect with someone.",
    example: "Let's touch base tomorrow morning to review today's achievements.",
    challenge: "Practice saying: 'I just wanted to touch base with you regarding our progress.'"
  },
  {
    phrase: "Level the playing field",
    meaning: "To create a situation where everyone has a fair and equal chance.",
    example: "Mastering English communication and coding levels the playing field in tech.",
    challenge: "Express your thoughts on how discipline levels the playing field for anyone."
  },
  {
    phrase: "By the book",
    meaning: "Doing something strictly according to the rules and established procedures.",
    example: "He follows his training schedule strictly by the book.",
    challenge: "Use 'by the book' in two full sentences describing your daily schedule."
  },
  {
    phrase: "Bite the bullet",
    meaning: "To face an inevitable grim situation with courage and get it done.",
    example: "I decided to bite the bullet and wake up at 6 AM every day.",
    challenge: "Speak aloud about a tough habit you had to bite the bullet to start."
  },
  {
    phrase: "Cut to the chase",
    meaning: "Come directly to the main point without wasting time on details.",
    example: "Let's cut to the chase and focus on the highest-priority task first.",
    challenge: "Practice using this phrase in a simulated team standup meeting."
  },
  {
    phrase: "See eye to eye",
    meaning: "To agree completely with someone on a topic.",
    example: "My workout partner and I see eye to eye on sticking to our fitness schedule.",
    challenge: "Talk about someone you see eye to eye with on discipline."
  },
  {
    phrase: "On the ball",
    meaning: "Quick to understand, react, and handle situations efficiently.",
    example: "After a 20-minute morning walk, my mind is completely on the ball.",
    challenge: "Describe what helps you stay on the ball during a busy day."
  },
  {
    phrase: "Back to the drawing board",
    meaning: "Start over from the beginning because a previous plan failed.",
    example: "When the bug persisted, we went back to the drawing board to rethink the logic.",
    challenge: "Speak for 1 minute about a time you had to go back to the drawing board and learned a lesson."
  }
];

export function getDailyEnglishPhrase() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = Math.abs(dayOfYear) % DAILY_ENGLISH_PHRASES.length;
  return DAILY_ENGLISH_PHRASES[index];
}
