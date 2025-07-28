'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getRouteConfig } from '../lib/routeConfig';
import { getSelectedExam } from '@/lib/utils';

interface RouteProtectionProps {
  children: React.ReactNode;
}

export const RouteProtection = ({ children }: RouteProtectionProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const selectedExam = getSelectedExam();

  useEffect(() => {
    const routeConfig = getRouteConfig(pathname);

    if (status === 'loading' || !routeConfig) return;

    if (routeConfig.requiresAuth && !session) {
      router.push(routeConfig.redirectTo || '/auth/signin');
      return;
    }

    if (routeConfig.requiresExamSelection && !selectedExam) {
      router.push(routeConfig.examSelectionRedirect || '/exam-selection');
      return;
    }
  }, [pathname, router, session, status, selectedExam]);

  return <>{children}</>;
};