// server.js - Main Express server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import data files
const aboutData = require('./data/about');
const skillsData = require('./data/skills');
const projectsData = require('./data/projects');
const caseStudiesData = require('./data/casestudies');
const blogsData = require('./data/blogs');

// Import models
const Contact = require('./models/Contact');
const Blog = require('./models/Blog');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for resume PDF, images, etc.)
app.use('/static', express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// About endpoint
app.get('/api/about', (req, res) => {
  try {
    res.json(aboutData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about data' });
  }
});

// Skills endpoint
app.get('/api/skills', (req, res) => {
  try {
    const { category } = req.query;
    
    if (category) {
      const categoryData = skillsData.categories[category];
      if (!categoryData) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ [category]: categoryData });
    } else {
      res.json(skillsData);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills data' });
  }
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  try {
    const { category, featured } = req.query;
    let projects = [...projectsData];
    
    if (category) {
      projects = projects.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (featured === 'true') {
      projects = projects.filter(project => project.featured === true);
    }
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects data' });
  }
});

// Single project endpoint
app.get('/api/projects/:id', (req, res) => {
  try {
    const project = projectsData.find(p => p.id === parseInt(req.params.id));
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Case studies endpoint
app.get('/api/casestudies', (req, res) => {
  try {
    res.json(caseStudiesData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch case studies data' });
  }
});

// Single case study endpoint
app.get('/api/casestudies/:id', (req, res) => {
  try {
    const caseStudy = caseStudiesData.find(cs => cs.id === parseInt(req.params.id));
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
});

// Blogs endpoint
app.get('/api/blogs', async (req, res) => {
  try {
    // First try to get blogs from database
    const dbBlogs = await Blog.find().sort({ createdAt: -1 });
    
    // If no blogs in database, return static data
    if (dbBlogs.length === 0) {
      return res.json(blogsData);
    }
    
    res.json(dbBlogs);
  } catch (error) {
    // Fallback to static data if database fails
    res.json(blogsData);
  }
});

// Single blog endpoint
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    // Try database first
    let blog = await Blog.findOne({ slug: req.params.slug });
    
    // Fallback to static data
    if (!blog) {
      blog = blogsData.find(b => b.slug === req.params.slug);
    }
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Create new blog post (for admin use)
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, slug, excerpt, content, tags } = req.body;
    
    // Check if blog with same slug exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ error: 'Blog with this slug already exists' });
    }
    
    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      tags,
      readTime: calculateReadTime(content)
    });
    
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const contact = new Contact({
      name,
      email,
      message
    });
    
    const savedContact = await contact.save();
    
    res.status(201).json({ 
      message: 'Thank you for your message! I\'ll get back to you soon.',
      id: savedContact._id 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// Get all contact messages (for admin use)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Resume download endpoint
app.get('/api/resume', (req, res) => {
  const resumePath = path.join(__dirname, 'public', 'resume.pdf');
  res.download(resumePath, 'Ishika_Resume.pdf', (err) => {
    if (err) {
      res.status(404).json({ error: 'Resume not found' });
    }
  });
});

// Placeholder image endpoint
app.get('/api/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  const w = parseInt(width) || 400;
  const h = parseInt(height) || 300;
  
  // Create a simple SVG placeholder instead of relying on external services
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#6b7280" text-anchor="middle" dy=".3em">
        ${w} × ${h}
      </text>
    </svg>
  `;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(svg);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Utility function to calculate reading time
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;