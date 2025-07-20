"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { ReactNode } from "react"
import { getRouteConfig, getSelectedExam } from "@/lib/routeConfig"

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
  requireAuth?: boolean
  requireExamSelection?: boolean
  redirectTo?: string
  examSelectionRedirect?: string
}

export function ProtectedRoute({ 
  children, 
  fallback,
  requireAuth = true,
  requireExamSelection = false,
  redirectTo = "/auth/signin",
  examSelectionRedirect = "/exam-selection"
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication first
    if (requireAuth && status === "unauthenticated") {
      router.push(redirectTo)
      return
    }

    // If auth is required and user is authenticated, check exam selection
    if (requireAuth && requireExamSelection && status === "authenticated") {
      const selectedExam = getSelectedExam()
      if (!selectedExam) {
        router.push(examSelectionRedirect)
        return
      }
    }
  }, [status, router, requireAuth, requireExamSelection, redirectTo, examSelectionRedirect])

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400"></div>
      </div>
    )
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !session) {
    return fallback || null
  }

  // If exam selection is required but not selected
  if (requireAuth && requireExamSelection && session) {
    const selectedExam = getSelectedExam()
    if (!selectedExam) {
      return fallback || null
    }
  }

  return <>{children}</>
} 