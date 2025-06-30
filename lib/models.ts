import { ObjectId } from 'mongodb'

export interface Project {
  _id?: ObjectId
  title: string
  description: string
  tech: string[]
  image: string
  link: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Admin {
  _id?: ObjectId
  username: string
  passwordHash: string
  createdAt: Date
  lastLogin?: Date
}

export interface ProjectInput {
  title: string
  description: string
  tech: string[]
  image: string
  link: string
  featured?: boolean
}