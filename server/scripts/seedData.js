// =============================================================================
// scripts/seedData.js - Database seeding script
// =============================================================================

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const blogsData = require('../data/blogs');

dotenv.config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Blog.deleteMany({});
    await Contact.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Seed blog posts
    const blogPromises = blogsData.map(blog => {
      const newBlog = new Blog({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        tags: blog.tags,
        readTime: blog.readTime,
        published: blog.published,
        createdAt: new Date(blog.date)
      });
      return newBlog.save();
    });

    await Promise.all(blogPromises);
    console.log('📝 Seeded blog posts');

    // Seed sample contact messages
    const sampleContacts = [
      {
        name: "John Doe",
        email: "john@example.com",
        message: "Hi Ishika! I love your portfolio. Would like to discuss a potential collaboration.",
        createdAt: new Date('2025-01-20')
      },
      {
        name: "Sarah Wilson",
        email: "sarah@designstudio.com",
        message: "We have an exciting UX project and think you'd be perfect for it. Let's connect!",
        createdAt: new Date('2025-01-18')
      }
    ];

    const contactPromises = sampleContacts.map(contact => {
      const newContact = new Contact(contact);
      return newContact.save();
    });

    await Promise.all(contactPromises);
    console.log('📧 Seeded contact messages');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;