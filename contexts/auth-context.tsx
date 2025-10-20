"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserRole = "ADMIN" | "CUSTOMER" | null

interface User {
  id?: number
  email: string | null
  role: UserRole
  name: string | null
  firstName?: string | null
  lastName?: string | null
  phoneNumber?: string | null
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (firstname: string, lastname: string, phone: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
  isAdmin: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Load session from server cookies
    const loadSession = async () => {
      try {
        const resp = await fetch("/api/auth/session", { cache: "no-store" })
        if (resp.ok) {
          const data = await resp.json()
          setUser(data.user)
          console.log("User loaded:", data)
        } else {
          console.error("Error loading session:", resp.statusText)
          setUser(null)
        }
      } catch(error) {
        console.error("Error loading session:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    void loadSession()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!resp.ok) return false
      // Cookies set by API route; fetch session for user info
      const session = await fetch("/api/auth/session", { cache: "no-store" })
      if (session.ok) {
        const data = await session.json()
        setUser(data.user)
      }
      return true
    } catch {
      return false
    }
  }

  const register = async (firstname: string, lastname: string, phone: string, email: string, password: string): Promise<boolean> => {
    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, phone, email, password }),
      })
      if (!resp.ok) return false
      const session = await fetch("/api/auth/session", { cache: "no-store" })
      if (session.ok) {
        const data = await session.json()
        setUser(data.user)
      }
      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    const perform = async () => {
      try {
        await fetch("/api/auth/logout", { method: "POST" })
      } catch {}
      setUser(null)
      router.push("/")
    }
    void perform()
  }

  const refreshUser = async () => {
    try {
      const resp = await fetch("/api/auth/session", { cache: "no-store" })
      if (resp.ok) {
        const data = await resp.json()
        setUser(data.user)
      }
    } catch {
      // ignore
    }
  }

  const isAdmin = user?.role === "ADMIN"

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
