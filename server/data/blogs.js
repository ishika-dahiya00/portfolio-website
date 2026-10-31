// =============================================================================
// data/blogs.js - Blog posts data (fallback for static content)
// =============================================================================

module.exports = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    slug: "future-web-development-2025",
    excerpt: "Exploring emerging trends, technologies, and best practices that are shaping the web development landscape in 2025 and beyond.",
    content: `
# The Future of Web Development in 2025

As we progress through 2025, the web development landscape continues to evolve at a rapid pace. From AI-powered development tools to new frameworks and paradigms, let's explore what's shaping our industry.

## AI-Powered Development

The integration of AI in development workflows has become more sophisticated, with tools that can generate, review, and optimize code with increasing accuracy.

## WebAssembly Mainstream Adoption

WebAssembly is no longer a niche technology. We're seeing more applications leveraging WASM for performance-critical features.

## The Rise of Edge Computing

Edge computing is transforming how we think about application architecture and user experience optimization.

## Key Takeaways

- Embrace AI as a development companion, not a replacement
- Consider WebAssembly for performance-critical features
- Design with edge computing in mind for global applications
- Stay curious and keep experimenting with new technologies
    `,
    date: "2025-01-15",
    readTime: "7 min read",
    tags: ["Web Development", "AI", "WebAssembly", "Edge Computing", "Future Tech"],
    published: true
  },
  {
    id: 2,
    title: "Building Design Systems That Scale",
    slug: "design-systems-scale",
    excerpt: "A comprehensive guide to creating and maintaining design systems that grow with your product and team, from initial concept to enterprise-level implementation.",
    content: `
# Building Design Systems That Scale

Design systems are more than just component libraries—they're the foundation of consistent, efficient product development. Here's how to build one that scales.

## Start Small, Think Big

Begin with your most commonly used components and gradually expand based on actual needs rather than theoretical requirements.

## Documentation is Everything

A design system is only as good as its documentation. Invest time in clear, comprehensive guides that help both designers and developers.

## Governance and Maintenance

Establish clear processes for updates, contributions, and quality control. A design system without governance quickly becomes technical debt.

## Measuring Success

Track adoption rates, consistency metrics, and developer satisfaction to understand the impact of your design system.
    `,
    date: "2025-01-10",
    readTime: "8 min read",
    tags: ["Design Systems", "UX", "Collaboration", "Documentation", "Scaling"],
    published: true
  },
  {
    id: 3,
    title: "The Art of Micro-Interactions in Modern UX",
    slug: "micro-interactions-modern-ux",
    excerpt: "Discover how thoughtful micro-interactions can transform user experience, provide feedback, and create delightful moments in digital products.",
    content: `
# The Art of Micro-Interactions in Modern UX

Micro-interactions are the small, functional animations that occur as a result of user actions. They might seem minor, but they play a crucial role in creating intuitive and engaging user experiences.

## What Makes a Good Micro-Interaction

The best micro-interactions feel natural and purposeful. They provide immediate feedback, guide user attention, and make interfaces feel alive and responsive.

## Common Use Cases

- Form validation feedback
- Button hover states
- Loading indicators
- Navigation transitions
- Success confirmations

## Implementation Tips

Keep animations fast (usually under 300ms), ensure they serve a functional purpose, and always consider accessibility implications.
    `,
    date: "2025-01-05",
    readTime: "6 min read",
    tags: ["UX Design", "Animation", "User Interface", "Interaction Design"],
    published: true
  }
];