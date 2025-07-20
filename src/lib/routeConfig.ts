export interface RouteConfig {
  path: string;
  requiresAuth: boolean;
  requiresExamSelection: boolean;
  redirectTo?: string;
  examSelectionRedirect?: string;
}

export const ROUTE_CONFIG: RouteConfig[] = [
  { path: '/', requiresAuth: false, requiresExamSelection: false },
  { path: '/about', requiresAuth: false, requiresExamSelection: false },
  { path: '/auth/signin', requiresAuth: false, requiresExamSelection: false },
  { path: '/auth/error', requiresAuth: false, requiresExamSelection: false },
  { path: '/profile', requiresAuth: true, requiresExamSelection: false, redirectTo: '/auth/signin' },
  { path: '/practice', requiresAuth: true, requiresExamSelection: true, redirectTo: '/auth/signin', examSelectionRedirect: '/exam-selection' },
  { path: '/custom-topic', requiresAuth: false, requiresExamSelection: false },
  { path: '/exam-selection', requiresAuth: false, requiresExamSelection: false },
];

export function getRouteConfig(pathname: string): RouteConfig | undefined {
  return ROUTE_CONFIG.find(config => config.path === pathname);
}

 