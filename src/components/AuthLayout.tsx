"use client"

import { useRouteGuard } from "@/hooks/useRouteGuard"
import { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  requireAuth?: boolean
  requireExamSelection?: boolean
  redirectTo?: string
  examSelectionRedirect?: string
}

export function AuthLayout({ 
  children, 
  requireAuth = true,
  requireExamSelection = false,
  redirectTo = "/auth/signin",
  examSelectionRedirect = "/exam-selection"
}: AuthLayoutProps) {
  const { isAuthorized, hasSelectedExam, isLoading } = useRouteGuard()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400"></div>
      </div>
    )
  }

  // Check authentication
  if (requireAuth && !isAuthorized) {
    return null
  }

  // Check exam selection (only if auth is required and user is authenticated)
  if (requireAuth && requireExamSelection && !hasSelectedExam) {
    return null
  }

  return <>{children}</>
} 