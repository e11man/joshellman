/**
 * MongoDB Atlas Database Population Script
 * 
 * This script connects to MongoDB Atlas and populates it with sample data.
 * 
 * IMPORTANT: Before running this script, you must update your .env.local file
 * with your MongoDB Atlas password in the connection string.
 */

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function populateAtlasDatabase() {
  console.log('\n📝 SETUP INSTRUCTIONS:\n');
  console.log('1. Open your .env.local file');
  console.log('2. Replace YOUR_PASSWORD_HERE in the MONGODB_URI with your actual MongoDB Atlas password');
  console.log('3. Save the file and run this script again\n');
  
  // Check if password placeholder is still in the connection string
  if (process.env.MONGODB_URI.includes('YOUR_PASSWORD_HERE')) {
    console.error('❌ Error: You need to update your MongoDB Atlas password in .env.local');
    console.log('\nPlease follow the setup instructions above.\n');
    return;
  }
  
  let client;
  try {
    // Connect to MongoDB Atlas
    console.log('🔄 Connecting to MongoDB Atlas...');
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db(process.env.MONGODB_DB || 'portfolio');
    
    // Create collections if they don't exist
    console.log('\n📋 Checking collections...');
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    if (!collectionNames.includes('projects')) {
      await db.createCollection('projects');
      console.log('✅ Created projects collection');
      
      // Create indexes
      await db.collection('projects').createIndex({ title: 1 });
      await db.collection('projects').createIndex({ featured: 1 });
      await db.collection('projects').createIndex({ createdAt: -1 });
      console.log('✅ Created indexes for projects collection');
    } else {
      console.log('✓ Projects collection already exists');
    }
    
    if (!collectionNames.includes('admins')) {
      await db.createCollection('admins');
      console.log('✅ Created admins collection');
      
      // Create indexes
      await db.collection('admins').createIndex({ username: 1 }, { unique: true });
      console.log('✅ Created indexes for admins collection');
    } else {
      console.log('✓ Admins collection already exists');
    }
    
    // Check if admin user exists
    console.log('\n👤 Checking admin user...');
    const adminExists = await db.collection('admins').findOne({ username: 'admin' });
    
    if (!adminExists) {
      // Create default admin user
      const defaultPassword = 'admin123';
      const passwordHash = await bcrypt.hash(defaultPassword, 12);
      
      await db.collection('admins').insertOne({
        username: 'admin',
        passwordHash,
        createdAt: new Date()
      });
      
      console.log('✅ Created default admin user:');
      console.log('   Username: admin');
      console.log('   Password: admin123');
      console.log('   ⚠️  IMPORTANT: Change the default password after first login!');
    } else {
      console.log('✓ Admin user already exists');
    }
    
    // Insert sample projects if none exist
    console.log('\n🖼️  Checking projects...');
    const projectCount = await db.collection('projects').countDocuments();
    
    if (projectCount === 0) {
      const sampleProjects = [
        {
          title: 'E-Commerce Platform',
          description: 'Modern e-commerce solution with React, Next.js, and Stripe integration. Features include real-time inventory, advanced filtering, and mobile-optimized checkout.',
          tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
          link: '#',
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'SaaS Dashboard',
          description: 'Comprehensive analytics dashboard for SaaS businesses. Built with React and D3.js for interactive data visualization and real-time updates.',
          tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
          link: '#',
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Mobile Banking App',
          description: 'Secure mobile banking application with biometric authentication, real-time transactions, and intuitive user experience.',
          tech: ['React Native', 'TypeScript', 'Firebase', 'Plaid API'],
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
          link: '#',
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      const result = await db.collection('projects').insertMany(sampleProjects);
      console.log(`✅ Inserted ${result.insertedCount} sample projects`);
    } else {
      console.log(`✓ Found ${projectCount} existing projects, skipping sample data insertion`);
    }
    
    console.log('\n🎉 MongoDB Atlas database initialization completed successfully!');
    console.log('\n📱 Your portfolio application is now ready for production!');
    console.log('   - Main portfolio: https://ellamngroup.vercel.app');
    console.log('   - Admin dashboard: https://ellamngroup.vercel.app/admin');
    console.log('   - Admin login: username=admin, password=admin123');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('Authentication failed') || error.message.includes('bad auth')) {
      console.log('\n⚠️  Authentication Error: Please check your MongoDB Atlas username and password in .env.local');
      console.log('Make sure you have:');
      console.log('1. Replaced YOUR_PASSWORD_HERE with your actual password');
      console.log('2. Created a database user in MongoDB Atlas with the correct permissions');
      console.log('3. Added your current IP address to the IP Access List in MongoDB Atlas');
    }
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Disconnected from MongoDB Atlas');
    }
  }
}

// Main function
async function main() {
  try {
    console.log('\n🌟 MongoDB Atlas Database Population Script 🌟');
    await populateAtlasDatabase();
  } catch (error) {
    console.error('Failed to populate database:', error);
    process.exit(1);
  }
}

main();