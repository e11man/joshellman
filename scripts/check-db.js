const { MongoClient } = require('mongodb')
require('dotenv').config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio'

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable')
  process.exit(1)
}

async function checkDatabase() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(MONGODB_DB)
    
    // Check collections
    const collections = await db.listCollections().toArray()
    console.log('\nCollections:')
    collections.forEach(col => console.log(`- ${col.name}`))
    
    // Check projects
    const projectCount = await db.collection('projects').countDocuments()
    console.log(`\nProjects count: ${projectCount}`)
    
    if (projectCount > 0) {
      console.log('\nProjects in database:')
      const projects = await db.collection('projects').find({}).toArray()
      projects.forEach((project, index) => {
        console.log(`\n${index + 1}. ${project.title}`)
        console.log(`   Description: ${project.description.substring(0, 100)}...`)
        console.log(`   Tech: ${project.tech.join(', ')}`)
        console.log(`   Featured: ${project.featured}`)
        console.log(`   ID: ${project._id}`)
      })
    }
    
    // Check admins
    const adminCount = await db.collection('admins').countDocuments()
    console.log(`\nAdmin users count: ${adminCount}`)
    
    if (adminCount > 0) {
      const admins = await db.collection('admins').find({}, { projection: { username: 1, createdAt: 1 } }).toArray()
      console.log('\nAdmin users:')
      admins.forEach(admin => {
        console.log(`- ${admin.username} (created: ${admin.createdAt})`)
      })
    }
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
    console.log('\nDisconnected from MongoDB')
  }
}

checkDatabase().catch(console.error)