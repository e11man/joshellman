const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio'

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable')
  process.exit(1)
}

async function initializeDatabase() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(MONGODB_DB)
    
    // Create collections
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(col => col.name)
    
    if (!collectionNames.includes('projects')) {
      await db.createCollection('projects')
      console.log('Created projects collection')
      
      // Create indexes
      await db.collection('projects').createIndex({ title: 1 })
      await db.collection('projects').createIndex({ featured: 1 })
      await db.collection('projects').createIndex({ createdAt: -1 })
      console.log('Created indexes for projects collection')
    }
    
    if (!collectionNames.includes('admins')) {
      await db.createCollection('admins')
      console.log('Created admins collection')
      
      // Create indexes
      await db.collection('admins').createIndex({ username: 1 }, { unique: true })
      console.log('Created indexes for admins collection')
    }
    
    // Check if admin user exists
    const adminExists = await db.collection('admins').findOne({ username: 'admin' })
    
    if (!adminExists) {
      // Create default admin user
      const defaultPassword = 'admin123' // Change this!
      const passwordHash = await bcrypt.hash(defaultPassword, 12)
      
      await db.collection('admins').insertOne({
        username: 'admin',
        passwordHash,
        createdAt: new Date()
      })
      
      console.log('Created default admin user:')
      console.log('Username: admin')
      console.log('Password: admin123')
      console.log('⚠️  IMPORTANT: Change the default password after first login!')
    }
    
    // Insert sample projects if none exist
    const projectCount = await db.collection('projects').countDocuments()
    
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
      ]
      
      await db.collection('projects').insertMany(sampleProjects)
      console.log(`Inserted ${sampleProjects.length} sample projects`)
    }
    
    console.log('Database initialization completed successfully!')
    
  } catch (error) {
    console.error('Database initialization failed:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

initializeDatabase()