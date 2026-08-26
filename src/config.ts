// =========================================================================
// ❤️ OUR ROMANTIC JOURNEY - CONFIGURATION ❤️
// =========================================================================
// You can easily customize everything here to personalize it for your girlfriend!
// =========================================================================

/**
 * 1. YOUR WHATSAPP NUMBER
 * Replace with your international WhatsApp phone number (digits only, including country code).
 * Example: "1234567890" or "447123456789" (No '+' or spaces)
 */
export const WHATSAPP_NUMBER = "PUT_MY_NUMBER_HERE";

/**
 * 2. YOUR SPECIAL SONG
 * Place your MP3 file in the /public/music/our-song.mp3 folder, or use an audio URL.
 * The website also has an integrated romantic synthesized music box melody
 * that plays soothing romantic chords automatically if no custom MP3 is loaded!
 */
export const MUSIC_FILE = "/music/our-song.mp3";

/**
 * 3. HER NAME / PET NAME
 * Used in headings and personalized messages (default: "Beautiful")
 */
export const PARTNER_NAME = "Beautiful";

/**
 * 4. YOUR MEMORY PHOTOS (FOR THE FINAL SURPRISE REVEAL)
 * Add your favorite romantic photos here with cute captions and dates.
 * These will be displayed as animated romantic polaroids at Stage 15!
 */
export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  backStory: string;
  date?: string;
  rotation?: number; // subtle tilt angle in degrees
}

export const PHOTO_MEMORIES: MemoryPhoto[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
    title: "Where It All Started",
    caption: "The moment my whole world turned into something brighter ✨",
    backStory: "Looking back at this moment, I didn't know yet that you'd become my favorite person in the entire universe. But my heart already knew. ❤️",
    date: "A Day to Remember",
    rotation: -2.5,
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
    title: "Your Unstoppable Smile",
    caption: "My absolute favorite sight in the whole universe 🥹❤️",
    backStory: "Whenever you laugh with your whole heart, every problem fades away. Keep smiling just like this forever. 💕",
    date: "Pure Happiness",
    rotation: 2,
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
    title: "Just You & Me",
    caption: "Every single day with you is my favorite adventure 🌹",
    backStory: "No matter where we go or what we do, just holding your hand makes everywhere feel like home. 🏡✨",
    date: "Always & Forever",
    rotation: -1.5,
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop",
    title: "Hand in Hand",
    caption: "I'd still choose you over and over again, in every lifetime 💕",
    backStory: "Through every season, all the laughs, silly inside jokes, and quiet moments — I will always be right here by your side. ❤️",
    date: "Forever Yours",
    rotation: 2,
  },
];

/**
 * 5. FINAL LOVE LETTER MESSAGE
 * The heartfelt love note shown during the grand finale (Stage 15).
 */
export const FINAL_LOVE_LETTER = {
  header: "Out of all the people in this world, somehow I got you.",
  intro: "And honestly... that's one of the luckiest things that ever happened to me. ❤️",
  reasonsPrompt: "You are special to me—not because you're perfect, but because you're YOU.",
  reasons: [
    "Your smile.",
    "Your little habits.",
    "Your random moments.",
    "Your silly side.",
    "Your beautiful heart.",
  ],
  conclusion: "All of it.",
  promise: "And if I had to choose again...\n\nI'd still choose you. ❤️",
  footer: "Thank you for completing my little journey. 💕",
};

/**
 * 6. LITTLE LOVE JAR - BONUS REASONS WHY SHE IS ADORED
 * Interactive mini love notes she can pull randomly from the jar!
 */
export const LOVE_JAR_NOTES = [
  "The adorable way your eyes crinkle when you laugh genuinely hard. 🥰",
  "How safe and calm I feel the moment I talk to you. 🌙",
  "Your kindness towards the people you love. 🌸",
  "How you make ordinary days feel like special memories. ✨",
  "Your silly jokes that always catch me off guard. 😂❤️",
  "The warmth in your voice when you say goodnight. 💤",
  "How gorgeous you look even when you're half-asleep. 🥺",
  "The little excited dances you do when your favorite food arrives. 🍕",
  "How deeply you care about the little things. 🫶",
  "The fact that just seeing your name pop up on my screen instantly lifts my mood. 📱❤️",
  "Your cute stubbornness when you know you're right. 😌",
  "The sweet way you hug me and never want to let go. 🫂",
  "How you are my safe haven in a noisy world. 🤍",
  "That you chose to share your life and smile with me. 🌹",
  "Because you are effortlessly, completely, and undeniably YOU. ❤️",
];

/**
 * ALL 15 JOURNEY STAGES SPECIFICATION
 */
export interface JourneyStage {
  id: number;
  momentNumber: number;
  title: string;
  icon: string;
  taskInstruction: string;
  whatsappMessage: string;
  romanticMessage: string;
  unlockButtonText?: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 1,
    momentNumber: 1,
    title: "Just One Picture",
    icon: "📸",
    taskInstruction: "Send me one picture of yourself right now. No overthinking. I just want to see you. ❤️",
    whatsappMessage: "I completed your first little challenge ❤️",
    romanticMessage: "You know what's special about you?\nYou don't even have to try to look beautiful. Somehow, you just are. ❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 2,
    momentNumber: 2,
    title: "That Smile",
    icon: "😊",
    taskInstruction: "Send me your cutest smiling picture.",
    whatsappMessage: "Here is my smile just for you 😊❤️",
    romanticMessage: "Your smile has this unfair little habit of making my worst days feel better. I hope you never stop smiling. 🥹❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 3,
    momentNumber: 3,
    title: "Those Eyes",
    icon: "👀",
    taskInstruction: "Send me a picture where I can see your eyes.",
    whatsappMessage: "Looking right at you 👀❤️",
    romanticMessage: "There are a million beautiful things in this world, but somehow my favorite view is still you. ❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 4,
    momentNumber: 4,
    title: "Cutest Selfie",
    icon: "💋",
    taskInstruction: "Send me your cutest selfie. No excuses. 😌❤️",
    whatsappMessage: "My cutest selfie sent as requested 💋✨",
    romanticMessage: "I don't know how one person can be this cute, but I'm definitely not complaining. 😌❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 5,
    momentNumber: 5,
    title: "Your Favorite Look",
    icon: "👗",
    taskInstruction: "Send me a picture in your favorite outfit or look.",
    whatsappMessage: "Here is my favorite look 👗✨",
    romanticMessage: "Whatever you wear, whatever the occasion, you somehow make everything look beautiful just by being you. 🌸",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 6,
    momentNumber: 6,
    title: "Something That Reminds You of Me",
    icon: "🌸",
    taskInstruction: "Send me a picture of something around you that reminds you of me.",
    whatsappMessage: "This reminded me of you today 🌸❤️",
    romanticMessage: "Knowing that something can make you think of me, even for a second, means more to me than you probably realize. 🫶",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 7,
    momentNumber: 7,
    title: "Our Memory",
    icon: "🥰",
    taskInstruction: "Send me one picture from a memory that makes you smile.",
    whatsappMessage: "One of my favorite memories of us 🥰📸",
    romanticMessage: "Some memories become special because of where they happened. Ours are special because you were there. ❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 8,
    momentNumber: 8,
    title: "Right Now",
    icon: "📸",
    taskInstruction: "Take a new picture right now and send it. No old pictures this time. 😌❤️",
    whatsappMessage: "Fresh picture taken right now just for you 📸❤️",
    romanticMessage: "My favorite version of you isn't the perfect one. It's the real one—the one I get to know, laugh with, and love. ❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 9,
    momentNumber: 9,
    title: "Your Mood",
    icon: "🌙",
    taskInstruction: "Show me your current mood through one picture.",
    whatsappMessage: "My mood in one picture 🌙✨",
    romanticMessage: "Whatever mood you're in, whatever kind of day you're having, I hope you always remember that someone out here cares about you so much. 🥹❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 10,
    momentNumber: 10,
    title: "Our Dream Place",
    icon: "✈️",
    taskInstruction: "Send me a picture of somewhere you want us to go together.",
    whatsappMessage: "Take me here with you ✈️🏝️❤️",
    romanticMessage: "I don't really care where we go. If I'm with you, even an ordinary place could become my favorite place. ❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 11,
    momentNumber: 11,
    title: "Something You Love",
    icon: "❤️",
    taskInstruction: "Send me a picture of something you absolutely love.",
    whatsappMessage: "Something I truly love ❤️✨",
    romanticMessage: "I love discovering the little things that make you happy. Because your happiness matters to me more than you know. 🫶",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 12,
    momentNumber: 12,
    title: "No Filter",
    icon: "😌",
    taskInstruction: "Send me a completely natural picture. No filter. No editing. Just you.",
    whatsappMessage: "100% natural, no filter, just me 😌❤️",
    romanticMessage: "You never needed a filter to be beautiful. Please remember that, especially on the days when you don't see it yourself. ❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 13,
    momentNumber: 13,
    title: "The Picture You Love",
    icon: "🥹",
    taskInstruction: "Choose the picture of yourself that you think I would love the most.",
    whatsappMessage: "I think you will love this picture 🥹❤️",
    romanticMessage: "You know what'd choose? Every version of you. The happy you, sleepy you, silly you, serious you... all of them. ❤️",
    unlockButtonText: "Unlock Next ❤️",
  },
  {
    id: 14,
    momentNumber: 14,
    title: "One Last Picture",
    icon: "💌",
    taskInstruction: "Send me one picture and tell me on WhatsApp why you chose it.",
    whatsappMessage: "Here is my special picture and why I picked it... 💌❤️",
    romanticMessage: "If I could keep only one thing from this entire journey, it wouldn't be any picture. It would be the feeling of having you in my life. ❤️",
    unlockButtonText: "Unlock The Final Surprise ❤️",
  },
];
