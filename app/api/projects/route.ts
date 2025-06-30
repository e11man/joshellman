import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { Project, ProjectInput } from '@/lib/models'
import { ObjectId } from 'mongodb'
import { verifyAuth } from '@/lib/auth'

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    
    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    
    let query = {}
    if (featured === 'true') {
      query = { featured: true }
    }
    
    const projects = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()
    
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await verifyAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body: ProjectInput = await request.json()
    
    // Validate required fields
    if (!body.title || !body.description || !body.tech || !body.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const db = await getDatabase()
    const collection = db.collection<Project>('projects')
    
    const project: Omit<Project, '_id'> = {
      title: body.title,
      description: body.description,
      tech: body.tech,
      image: body.image,
      link: body.link,
      featured: body.featured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(project)
    
    return NextResponse.json(
      { message: 'Project created successfully', id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}