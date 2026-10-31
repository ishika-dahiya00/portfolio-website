// =============================================================================
// data/skills.js - Skills and expertise data
// =============================================================================

module.exports = {
  categories: {
    frontend: {
      name: "Frontend Development",
      skills: [
        { name: "React", icon: "⚛️", level: 95, description: "Expert in React hooks, context, and modern patterns" },
        { name: "Vue.js", icon: "💚", level: 85, description: "Proficient in Vue 3, Vuex, and Vue Router" },
        { name: "TypeScript", icon: "🔷", level: 88, description: "Strong typing and advanced TypeScript patterns" },
        { name: "JavaScript", icon: "🟨", level: 95, description: "ES6+, async programming, and modern JS" },
        { name: "HTML5", icon: "🌐", level: 98, description: "Semantic markup and accessibility" },
        { name: "CSS3", icon: "🎭", level: 95, description: "Advanced layouts, animations, and responsive design" },
        { name: "Tailwind CSS", icon: "🎨", level: 92, description: "Utility-first CSS framework expertise" },
        { name: "Sass/SCSS", icon: "🎯", level: 88, description: "Advanced preprocessing and mixins" }
      ]
    },
    backend: {
      name: "Backend Development",
      skills: [
        { name: "Node.js", icon: "🟢", level: 85, description: "Server-side JavaScript and APIs" },
        { name: "Express.js", icon: "🚀", level: 82, description: "RESTful APIs and middleware" },
        { name: "MongoDB", icon: "🍃", level: 78, description: "NoSQL database design and optimization" },
        { name: "PostgreSQL", icon: "🐘", level: 75, description: "Relational database design" },
        { name: "Firebase", icon: "🔥", level: 80, description: "Real-time databases and authentication" },
        { name: "GraphQL", icon: "🔗", level: 70, description: "Query language and Apollo" }
      ]
    },
    design: {
      name: "Design & UX",
      skills: [
        { name: "Figma", icon: "🎨", level: 95, description: "Advanced prototyping and design systems" },
        { name: "Adobe XD", icon: "💜", level: 85, description: "User experience and interaction design" },
        { name: "Sketch", icon: "💎", level: 80, description: "UI design and symbol libraries" },
        { name: "Photoshop", icon: "🖼️", level: 75, description: "Image editing and digital art" },
        { name: "Illustrator", icon: "🎭", level: 70, description: "Vector graphics and logo design" },
        { name: "InVision", icon: "🔮", level: 78, description: "Prototyping and collaboration" }
      ]
    },
    tools: {
      name: "Tools & Workflow",
      skills: [
        { name: "Git", icon: "📝", level: 90, description: "Version control and collaboration" },
        { name: "VS Code", icon: "🔵", level: 95, description: "Advanced editor customization" },
        { name: "Webpack", icon: "📦", level: 75, description: "Module bundling and optimization" },
        { name: "Docker", icon: "🐳", level: 68, description: "Containerization and deployment" },
        { name: "AWS", icon: "☁️", level: 65, description: "Cloud services and hosting" },
        { name: "Netlify", icon: "🌐", level: 85, description: "Static site deployment" }
      ]
    }
  }
};
