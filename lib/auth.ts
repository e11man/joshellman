import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface AuthPayload {
  adminId: string
  username: string
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload
    return payload
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from cookie
  const tokenFromCookie = request.cookies.get('admin-token')?.value
  if (tokenFromCookie) {
    return tokenFromCookie
  }
  
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  return null
}

export function isAuthenticated(request: NextRequest): AuthPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }
  
  return verifyToken(token)
}

export function verifyAuth(request: NextRequest): AuthPayload | null {
  return isAuthenticated(request)
}