const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    console.log('Connection string:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test creating a document
    const testSchema = new mongoose.Schema({ message: String });
    const Test = mongoose.model('Test', testSchema);
    
    const testDoc = new Test({ message: 'Hello from Portfolio!' });
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Clean up
    await Test.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up');
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();