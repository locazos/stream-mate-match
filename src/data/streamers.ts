
export interface Streamer {
  id: string;
  name: string;
  profileImage: string;
  bio: string;
  category: string;
  level: string;
  followers: string;
  schedule: string;
  lookingFor: string[];
  matchPercentage: number;
}

export const mockStreamers: Streamer[] = [
  {
    id: "1",
    name: "GamerGirl_42",
    profileImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    bio: "Variety streamer focusing on RPGs and story-driven games. Looking for chill co-op partners!",
    category: "RPG Gaming",
    level: "Partner",
    followers: "50K",
    schedule: "Evenings",
    lookingFor: ["Co-streaming", "Community Events", "Long-term Collabs"],
    matchPercentage: 95
  },
  {
    id: "2",
    name: "SpeedRunner_Pro",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    bio: "Speedrunning classic games and sharing strategies. Always looking to learn new tricks!",
    category: "Speedrunning",
    level: "Partner",
    followers: "120K",
    schedule: "Weekends",
    lookingFor: ["Tournament Teams", "Coaching Sessions", "Shared Projects"],
    matchPercentage: 82
  },
  {
    id: "3",
    name: "CozyStreamerVibe",
    profileImage: "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    bio: "Laid-back streams with lots of chat interaction. I play indie games and sometimes do art!",
    category: "Just Chatting",
    level: "Affiliate",
    followers: "12K",
    schedule: "Weekdays",
    lookingFor: ["Guest Appearances", "Podcast/Talk Shows", "Co-streaming"],
    matchPercentage: 78
  },
  {
    id: "4",
    name: "ESports_Legend",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    bio: "Competitive FPS player streaming tournaments and practice sessions. Looking for a team!",
    category: "FPS Gaming",
    level: "Pro",
    followers: "200K",
    schedule: "Daily",
    lookingFor: ["Tournament Teams", "Coaching", "Esports Collabs"],
    matchPercentage: 65
  },
  {
    id: "5",
    name: "CreativeCrafter",
    profileImage: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    bio: "Art, crafting, and creative game streams. Love sharing creativity and positive vibes!",
    category: "Art",
    level: "Affiliate",
    followers: "25K",
    schedule: "Afternoons",
    lookingFor: ["Creative Collabs", "Community Events", "Guest Appearances"],
    matchPercentage: 89
  }
];

export const mockMatches: Streamer[] = [
  {
    id: "6",
    name: "TechTalker",
    profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    bio: "Tech news, reviews and programming streams. Looking for guest appearances!",
    category: "Technology",
    level: "Affiliate",
    followers: "8K",
    schedule: "Weekends",
    lookingFor: ["Guest Appearances", "Podcast/Talk Shows", "Educational"],
    matchPercentage: 91
  },
  {
    id: "7",
    name: "RetroGamer99",
    profileImage: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    bio: "Exploring classic games from the 80s and 90s. Always up for retro gaming discussions!",
    category: "Retro Gaming",
    level: "Partner",
    followers: "45K",
    schedule: "Evenings",
    lookingFor: ["Co-streaming", "Community Events", "Podcast Guest"],
    matchPercentage: 85
  }
];
