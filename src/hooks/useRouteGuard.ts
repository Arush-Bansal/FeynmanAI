"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getRouteConfig } from "@/lib/routeConfig"
import { getSelectedExam } from "@/lib/utils"

export function useRouteGuard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [hasSelectedExam, setHasSelectedExam] = useState<boolean | null>(null)

  useEffect(() => {
    const routeConfig = getRouteConfig(pathname)
    
    if (!routeConfig) {
      // Default to requiring auth for unknown routes
      if (status === "unauthenticated") {
        router.push("/auth/signin")
      } else if (status === "authenticated") {
        setIsAuthorized(true)
      }
      return
    }

    // Check authentication first
    if (routeConfig.requiresAuth && status === "unauthenticated") {
      router.push(routeConfig.redirectTo || "/auth/signin")
      setIsAuthorized(false)
      return
    }

    // If auth is required and user is authenticated, check exam selection
    if (routeConfig.requiresAuth && status === "authenticated") {
      setIsAuthorized(true)
      
      // Check exam selection only if required and user is authenticated
      if (routeConfig.requiresExamSelection) {
        const selectedExam = getSelectedExam()
        if (!selectedExam) {
          router.push(routeConfig.examSelectionRedirect || "/exam-selection")
          setHasSelectedExam(false)
          return
        } else {
          setHasSelectedExam(true)
        }
      } else {
        setHasSelectedExam(true) // Not required for this route
      }
    } else if (!routeConfig.requiresAuth) {
      // Public route - no auth required
      setIsAuthorized(true)
      setHasSelectedExam(true) // Not required for public routes
    }
  }, [status, pathname, router])

  return {
    isAuthorized,
    hasSelectedExam,
    isLoading: status === "loading",
    session,
    status
  }
} 