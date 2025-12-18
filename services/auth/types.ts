import { Session } from "next-auth"

export interface ExtendedSession extends Session {
  user: {
    id: string
    name: string
    email: string
    image?: string
  }
}

export interface AuthUser {
  id: string
  name: string
  email: string
  image?: string
  githubUsername?: string
} 