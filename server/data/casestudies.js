// =============================================================================
// data/casestudies.js - UX design case studies
// =============================================================================

module.exports = [
  {
    id: 1,
    title: "Redesigning Digital Banking Experience",
    subtitle: "Making financial services more accessible and user-friendly",
    client: "Regional Bank",
    duration: "4 months",
    year: "2024",
    role: "Lead UX Designer",
    team: ["UX Designer", "UI Designer", "Product Manager", "Developer"],
    image: "/api/placeholder/800/500",
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    problem: "The existing banking application had a complex navigation structure and outdated interface that confused users, leading to decreased engagement and increased support calls. Customer satisfaction scores were below industry average.",
    process: [
      "Conducted user interviews with 25 existing customers",
      "Analyzed competitor applications and industry best practices", 
      "Created detailed user personas and journey maps",
      "Developed wireframes and interactive prototypes",
      "Performed usability testing with 15 participants",
      "Iterated design based on user feedback"
    ],
    solution: "Redesigned the entire user experience with a simplified navigation structure, improved information architecture, and modern visual design. Implemented intuitive icons, clear call-to-action buttons, and streamlined user flows for common banking tasks.",
    results: [
      "Customer satisfaction increased by 40%",
      "Task completion rate improved by 65%",
      "Support calls reduced by 30%",
      "Mobile app store rating increased from 3.2 to 4.6"
    ],
    learnings: "The importance of understanding user mental models cannot be overstated. What seems logical to designers may not align with user expectations. Regular testing and iteration are crucial for creating truly user-centered experiences.",
    tags: ["UX Research", "Mobile Design", "Prototyping", "Usability Testing"],
    tools: ["Figma", "Miro", "Maze", "Hotjar"],
    featured: true
  },
  {
    id: 2,
    title: "E-learning Platform UX Optimization",
    subtitle: "Improving student engagement and learning outcomes",
    client: "EdTech Startup",
    duration: "3 months", 
    year: "2024",
    role: "UX/UI Designer",
    image: "/api/placeholder/800/500",
    problem: "Students were struggling with course navigation and had low completion rates. The platform lacked engagement features and clear progress indicators.",
    solution: "Redesigned the learning experience with gamification elements, clear progress tracking, and improved course structure visualization.",
    results: [
      "Course completion rate increased by 55%",
      "Time spent on platform increased by 80%",
      "Student satisfaction scores improved by 45%"
    ],
    tags: ["Educational Design", "Gamification", "User Engagement"],
    featured: false
  }
];
