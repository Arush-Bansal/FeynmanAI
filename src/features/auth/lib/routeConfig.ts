export interface RouteConfig {
  path: string;
  requiresAuth: boolean;
  requiresExamSelection: boolean;
  /**
   * The path to redirect to if authentication is required but the user is not logged in.
   * This can be different for various routes to support multiple login flows.
   * Default value is '/auth/signin' as set in RouteProtection.tsx.
   */
  redirectTo?: string;
  /**
   * The path to redirect to if exam selection is required but no exam is selected.
   * This can be different for various routes to support specialized exam selection flows.
   * Default value is '/exam-selection' as set in RouteProtection.tsx.
   */
  examSelectionRedirect?: string;
}

const ROUTE_CONFIG: RouteConfig[] = [
  { path: '/', requiresAuth: false, requiresExamSelection: false },
  { path: '/about', requiresAuth: false, requiresExamSelection: false },
  { path: '/auth/signin', requiresAuth: false, requiresExamSelection: false },
  { path: '/auth/error', requiresAuth: false, requiresExamSelection: false },
  { path: '/profile', requiresAuth: true, requiresExamSelection: false, redirectTo: '/auth/signin' },
  { path: '/history', requiresAuth: true, requiresExamSelection: false, redirectTo: '/auth/signin' },
  { path: '/select-topic', requiresAuth: true, requiresExamSelection: true, redirectTo: '/auth/signin', examSelectionRedirect: '/exam-selection' },
  { path: '/custom-topic', requiresAuth: false, requiresExamSelection: false },
  { path: '/exam-selection', requiresAuth: true, requiresExamSelection: false, redirectTo: '/auth/signin' },
  { path: '/practice', requiresAuth: true, requiresExamSelection: true, redirectTo: '/auth/signin', examSelectionRedirect: '/exam-selection' },
  { path: '/analysis', requiresAuth: true, requiresExamSelection: true, redirectTo: '/auth/signin', examSelectionRedirect: '/exam-selection' },
];

export function getRouteConfig(pathname: string): RouteConfig | undefined {
  return ROUTE_CONFIG.find(config => config.path === pathname);
}

 