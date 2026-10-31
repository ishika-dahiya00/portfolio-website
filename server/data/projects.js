// =============================================================================
// data/projects.js - Portfolio projects data
// =============================================================================

module.exports = [
  {
    id: 1,
    title: "EcoTracker - Sustainability App",
    description: "A comprehensive sustainability tracking application that helps users monitor their carbon footprint, set environmental goals, and connect with eco-conscious communities.",
    longDescription: "EcoTracker is a full-stack application built to address the growing need for personal environmental awareness. Users can track their daily activities, calculate carbon emissions, and receive personalized recommendations for reducing their environmental impact.",
    image: "/api/placeholder/600/400",
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    stack: ["React", "Node.js", "MongoDB", "Chart.js", "Tailwind CSS"],
    liveUrl: "https://ecotracker.demo.com",
    githubUrl: "https://github.com/ishika/ecotracker",
    category: "Web Application",
    featured: true,
    status: "Completed",
    year: 2024,
    features: [
      "Carbon footprint calculator",
      "Goal tracking and achievements",
      "Community challenges",
      "Data visualization",
      "Educational resources"
    ],
    challenges: "Implementing accurate carbon calculation algorithms and creating an intuitive data visualization system.",
    solutions: "Researched environmental APIs and created custom calculation formulas while designing clear, actionable charts."
  },
  {
    id: 2,
    title: "MindfulMoments - Meditation Platform",
    description: "A meditation and mindfulness platform featuring guided sessions, progress tracking, and personalized wellness recommendations.",
    longDescription: "MindfulMoments provides users with a comprehensive toolkit for mental wellness, including guided meditations, breathing exercises, and mood tracking capabilities.",
    image: "/api/placeholder/600/400",
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    stack: ["Vue.js", "Firebase", "Tailwind CSS", "PWA", "Web Audio API"],
    liveUrl: "https://mindfulmoments.demo.com",
    githubUrl: "https://github.com/ishika/mindfulmoments",
    category: "Mobile App",
    featured: true,
    status: "In Development",
    year: 2024,
    features: [
      "Guided meditation library",
      "Personalized recommendations",
      "Progress analytics",
      "Offline functionality",
      "Social sharing"
    ]
  },
  {
    id: 3,
    title: "CodeCollab - Real-time Code Editor",
    description: "A collaborative code editor with real-time synchronization, syntax highlighting, and integrated chat functionality for remote pair programming.",
    longDescription: "CodeCollab enables developers to write code together in real-time, regardless of their physical location. Built for remote teams and coding education.",
    image: "/api/placeholder/600/400",
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    stack: ["React", "Socket.io", "Express", "MongoDB", "CodeMirror", "WebRTC"],
    liveUrl: "https://codecollab.demo.com",
    githubUrl: "https://github.com/ishika/codecollab",
    category: "Developer Tool",
    featured: false,
    status: "Completed",
    year: 2023,
    features: [
      "Real-time collaboration",
      "Multi-language support",
      "Voice/video chat",
      "Session recording",
      "Code execution"
    ]
  }
];
