# Route Protection System

This system provides a comprehensive way to protect routes based on authentication and exam selection requirements.

## Overview

The protection system consists of three main components:

1. **Route Configuration** (`routeConfig.ts`) - Defines which routes require authentication and/or exam selection
2. **Route Guard Hook** (`useRouteGuard.ts`) - Handles the protection logic
3. **AuthLayout Component** (`AuthLayout.tsx`) - Wraps pages with protection

## How It Works

### 1. Authentication Protection
- Routes that require authentication will redirect unauthenticated users to `/auth/signin`
- Only checked after the user has logged in with Google

### 2. Exam Selection Protection
- Routes that require exam selection will redirect users to `/exam-selection` if no exam is selected
- Only checked after the user is already authenticated
- Exam selection is stored in localStorage

## Route Configuration

Routes are configured in `src/lib/routeConfig.ts`:

```typescript
export interface RouteConfig {
  path: string;
  requiresAuth: boolean;
  requiresExamSelection: boolean;
  redirectTo?: string;
  examSelectionRedirect?: string;
}
```

### Current Route Configuration:

- `/` - Public (no protection)
- `/about` - Public (no protection)
- `/auth/signin` - Public (no protection)
- `/auth/error` - Public (no protection)
- `/profile` - Requires authentication only
- `/practice` - Requires both authentication and exam selection
- `/custom-topic` - Public (no protection)
- `/exam-selection` - Public (no protection)

## Usage

### For Protected Pages

```typescript
import { AuthLayout } from "@/components/AuthLayout";

const MyProtectedPage = () => {
  return (
    <AuthLayout requireAuth={true} requireExamSelection={false}>
      {/* Your page content */}
    </AuthLayout>
  );
};
```

### For Pages Requiring Both Auth and Exam Selection

```typescript
import { AuthLayout } from "@/components/AuthLayout";

const PracticePage = () => {
  return (
    <AuthLayout requireAuth={true} requireExamSelection={true}>
      {/* Your page content */}
    </AuthLayout>
  );
};
```

### For Public Pages

```typescript
import { AuthLayout } from "@/components/AuthLayout";

const PublicPage = () => {
  return (
    <AuthLayout requireAuth={false}>
      {/* Your page content */}
    </AuthLayout>
  );
};
```

## Protection Flow

1. **User visits a protected route**
2. **Check authentication status**
   - If not authenticated → redirect to `/auth/signin`
   - If authenticated → continue to step 3
3. **Check exam selection (if required)**
   - If no exam selected → redirect to `/exam-selection`
   - If exam selected → render the page

## Adding New Routes

To add a new route to the protection system:

1. Add the route configuration to `ROUTE_CONFIG` in `routeConfig.ts`
2. Wrap the page component with `AuthLayout`
3. Set the appropriate `requireAuth` and `requireExamSelection` props

## Exam Categories

The system supports three exam categories:
- JEE (Engineering Entrance)
- NEET (Medical Entrance)
- UPSC (Civil Services)

Exam selection is stored in localStorage as `selectedExamCategory`.

## Benefits

- **Centralized Control**: All protection logic is in one place
- **Consistent UX**: Same loading states and redirects across all pages
- **Easy to Maintain**: Add/remove protection by updating the config
- **Type Safety**: TypeScript ensures correct configuration
- **Flexible**: Can easily add role-based protection later 