export const mockChannels = {
  "ch-1": {
    id: "ch-1",
    name: "TechByte",
    handle: "@techbyte",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    subscribers: "1.42M",
    subscriberCount: 1420000,
    verified: true,
    description: "Welcome to TechByte! Your daily dose of technology reviews, future concepts, and programming tips. We break down complex tech into simple bytes."
  },
  "ch-2": {
    id: "ch-2",
    name: "BeatDrop Music",
    handle: "@beatdrop_music",
    avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    subscribers: "840K",
    subscriberCount: 840000,
    verified: false,
    description: "Bringing you the finest electronic, lo-fi, and chillhop music to study, work, and relax to. New tracks uploaded every Tuesday and Friday."
  },
  "ch-3": {
    id: "ch-3",
    name: "CodeCraft Academy",
    handle: "@codecraft",
    avatar: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=100&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1200&auto=format&fit=crop&q=80",
    subscribers: "3.1M",
    subscriberCount: 3100000,
    verified: true,
    description: "Learn web development, machine learning, and software engineering. Clean tutorials for beginners and advanced developers alike."
  },
  "ch-4": {
    id: "ch-4",
    name: "WildEarth",
    handle: "@wildearth",
    avatar: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=100&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80",
    subscribers: "2.15M",
    subscriberCount: 2150000,
    verified: true,
    description: "Explore the wild side of our planet. Jaw-dropping wildlife documentaries, conservation stories, and cinematic nature expeditions."
  },
  "ch-5": {
    id: "ch-5",
    name: "PixelPlay Gaming",
    handle: "@pixelplay",
    avatar: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
    subscribers: "480K",
    subscriberCount: 480000,
    verified: false,
    description: "Let's play! Walkthroughs, speedruns, gaming news, and reviews of the latest indie gems and AAA blockbusters."
  }
};

export const mockVideos = [
  {
    id: "v-1",
    title: "Building a YouTube Clone with React & Custom CSS (Full Tutorial)",
    description: "In this comprehensive guide, we build a pixel-perfect YouTube clone using React and modern CSS features (grid, variables, glassmorphism). We'll implement global state, a custom video player with ambient ambient-glow, and dynamic category filters. Code files included in description!",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    channelId: "ch-3",
    views: "184,320",
    viewCount: 184320,
    likes: "12,400",
    likeCount: 12400,
    category: "Coding",
    duration: "12:14",
    publishDate: "3 days ago"
  },
  {
    id: "v-2",
    title: "Is This the Future of Smart Devices? - CyberRing Review",
    description: "We review the new CyberRing—a smart wearable that promises to replace your smartwatch, tracks your fitness metrics with medical-grade accuracy, and lets you pay at terminals with a flick of your wrist. Is it worth the $300 price tag?",
    thumbnail: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    channelId: "ch-1",
    views: "45,821",
    viewCount: 45821,
    likes: "2,980",
    likeCount: 2980,
    category: "Tech",
    duration: "8:02",
    publishDate: "5 hours ago"
  },
  {
    id: "v-3",
    title: "1 Hour Relaxing Lofi Beats for Coding, Studying & Gaming",
    description: "Put on your headphones, grab a hot drink, and dive into your zone. This mix features chill lo-fi beats, soothing rain soundscapes, and beautiful synth patterns compiled by BeatDrop Music.",
    thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    channelId: "ch-2",
    views: "923,015",
    viewCount: 923015,
    likes: "45,210",
    likeCount: 45210,
    category: "Music",
    duration: "10:00",
    publishDate: "1 week ago"
  },
  {
    id: "v-4",
    title: "Deep Into the Amazon Rainforest - 4K Cinematic Wildlife Film",
    description: "Embark on a breathtaking journey deep into the Amazon basin. Captured using cinematic cameras, this documentary showcases the incredible bio-diversity of the jungle, from colorful macaws to elusive jaguars.",
    thumbnail: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    channelId: "ch-4",
    views: "1,204,550",
    viewCount: 1204550,
    likes: "98,400",
    likeCount: 98400,
    category: "Nature",
    duration: "15:32",
    publishDate: "2 weeks ago"
  },
  {
    id: "v-5",
    title: "Top 10 Indie Games You Must Play in 2026",
    description: "Looking for something unique to play? We count down the absolute best indie titles released this year, featuring mind-bending puzzle platforms, gorgeous roguelikes, and immersive narrative-driven games.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    channelId: "ch-5",
    views: "12,940",
    viewCount: 12940,
    likes: "890",
    likeCount: 890,
    category: "Gaming",
    duration: "11:45",
    publishDate: "1 day ago"
  },
  {
    id: "v-6",
    title: "Clean Code vs. Dirty Code: React Edition",
    description: "Write cleaner React code today. We analyze common bad habits in React development—such as prop drilling, monolithic components, and unoptimized hooks—and refactor them step-by-step into clean, maintainable patterns.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    channelId: "ch-3",
    views: "64,220",
    viewCount: 64220,
    likes: "5,300",
    likeCount: 5300,
    category: "Coding",
    duration: "9:15",
    publishDate: "4 days ago"
  },
  {
    id: "v-7",
    title: "The Ultimate Cyberpunk Setup Tour (2026)",
    description: "Take a tour of my custom cyberpunk-themed desk setup. We detail the mechanical keyboards, custom-made neon lights, dual ultrawide monitor setup, and the custom water-cooled rig powering it all.",
    thumbnail: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    channelId: "ch-1",
    views: "340,910",
    viewCount: 340910,
    likes: "22,400",
    likeCount: 22400,
    category: "Tech",
    duration: "14:20",
    publishDate: "1 month ago"
  },
  {
    id: "v-8",
    title: "Alpine Calm - Ambient Acoustic Guitar for Focus",
    description: "Mellow acoustic guitar instrumentals recorded live in the Swiss Alps. Ideal background music for studying, reading, coding, or sleeping. Peaceful and calming loops.",
    thumbnail: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    channelId: "ch-2",
    views: "205,100",
    viewCount: 205100,
    likes: "8,920",
    likeCount: 8920,
    category: "Music",
    duration: "8:50",
    publishDate: "2 months ago"
  }
];

export const mockComments = {
  "v-1": [
    {
      id: "c-1-1",
      authorName: "Sarah Jenkins",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80",
      text: "This is easily the best React tutorial I've seen in a long time! The details on customizing the video player with React state were super helpful.",
      likes: 128,
      publishDate: "2 days ago"
    },
    {
      id: "c-1-2",
      authorName: "David Kim",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80",
      text: "The ambient glow effect in CSS is absolute genius. I'm going to implement that in my portfolio immediately.",
      likes: 45,
      publishDate: "1 day ago"
    },
    {
      id: "c-1-3",
      authorName: "Alex Mercer",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&auto=format&fit=crop&q=80",
      text: "Could you make a video on how to connect this to an actual backend with Node.js and MongoDB? Keep up the good work!",
      likes: 12,
      publishDate: "12 hours ago"
    }
  ],
  "v-2": [
    {
      id: "c-2-1",
      authorName: "Robert Dow",
      authorAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=50&auto=format&fit=crop&q=80",
      text: "Great review! I've been eyeing smart rings for a while. The pay feature seems very convenient, but the battery life is what worries me.",
      likes: 34,
      publishDate: "4 hours ago"
    },
    {
      id: "c-2-2",
      authorName: "Emily Watson",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&auto=format&fit=crop&q=80",
      text: "Does it work well with iOS health app sync? Thanks for the video!",
      likes: 9,
      publishDate: "2 hours ago"
    }
  ]
};
