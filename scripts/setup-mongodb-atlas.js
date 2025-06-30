/**
 * MongoDB Atlas Setup Script
 * 
 * This script helps you set up your MongoDB Atlas connection
 * and migrate data from your local MongoDB to Atlas.
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

// Current MongoDB URI (local)
const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/portfolio';

// Function to update .env.local with Atlas connection string
async function setupMongoDBAtlas() {
  console.log('\n🌟 MongoDB Atlas Setup Helper 🌟\n');
  console.log('This script will help you connect your portfolio app to MongoDB Atlas.\n');
  
  console.log('CURRENT CONFIGURATION:');
  console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
  
  if (process.env.MONGODB_URI !== LOCAL_MONGODB_URI) {
    console.log('\n✅ You are already using a non-local MongoDB connection.\n');
    console.log('If you want to change it, please update your .env.local file manually.');
    return;
  }
  
  console.log('\nYou are currently using a local MongoDB database.\n');
  console.log('To use MongoDB Atlas (cloud version), you need to:');
  console.log('1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register');
  console.log('2. Create a new cluster');
  console.log('3. Set up database access (username and password)');
  console.log('4. Set up network access (IP whitelist)');
  console.log('5. Get your connection string from the Atlas dashboard');
  
  console.log('\nOnce you have your MongoDB Atlas connection string, update your .env.local file:');
  console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority');
  
  console.log('\nAfter updating your .env.local file, run the following command to initialize your Atlas database:');
  console.log('node scripts/init-db.js');
  
  console.log('\nFor more detailed instructions, visit:');
  console.log('https://www.mongodb.com/docs/atlas/getting-started/');
}

// Function to check if we can connect to the current MongoDB
async function checkCurrentConnection() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('\n✅ Successfully connected to current MongoDB database!');
    
    const db = client.db(process.env.MONGODB_DB || 'portfolio');
    
    // Check collections
    const collections = await db.listCollections().toArray();
    console.log('\nCollections:');
    collections.forEach(col => console.log(`- ${col.name}`));
    
    // Check projects
    const projectCount = await db.collection('projects').countDocuments();
    console.log(`\nProjects count: ${projectCount}`);
    
    // Check admins
    const adminCount = await db.collection('admins').countDocuments();
    console.log(`\nAdmin users count: ${adminCount}`);
    
    await client.close();
  } catch (error) {
    console.error('\n❌ Error connecting to MongoDB:');
    console.error(error.message);
    console.log('\nPlease make sure your MongoDB server is running.');
    if (process.env.MONGODB_URI === LOCAL_MONGODB_URI) {
      console.log('For local MongoDB, run: brew services start mongodb-community');
    }
  }
}

// Main function
async function main() {
  await checkCurrentConnection();
  await setupMongoDBAtlas();
}

main().catch(console.error);