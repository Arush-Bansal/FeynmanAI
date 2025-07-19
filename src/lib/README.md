# Environment Configuration

This directory contains type-safe environment variable configuration for the Feynman application.

## Files

- `env.ts` - Core environment variable parsing using TypeScript types
- `config.ts` - Convenient configuration object and helper functions
- `README.md` - This documentation

## Usage

### Basic Usage

```typescript
import { config } from '@/lib/config'

// Access configuration safely
// Add your configuration access here
```

### Helper Functions

```typescript
import { hasEnv, getRequiredEnv } from '@/lib/config'

// Check if environment variable exists
if (hasEnv('YOUR_VARIABLE')) {
  // Variable exists
}

// Get required environment variable (throws if missing)
const value = getRequiredEnv('YOUR_VARIABLE')
```

### Direct Access

```typescript
import { env, hasEnv, getRequiredEnv } from '@/lib/config'

// Check if environment variable exists
if (hasEnv('YOUR_VARIABLE')) {
  // Variable exists
}

// Get required environment variable (throws if missing)
const value = getRequiredEnv('YOUR_VARIABLE')
```

## Environment Variables

### Required Variables
- Add your required environment variables here

### Getting Your API Keys
1. Add instructions for getting your API keys here
2. Create a new API key
3. Add it to your `.env` file:
   ```
   YOUR_VARIABLE=your-actual-value-here
   ```

## Type Safety

All environment variables are typed with TypeScript interfaces. This ensures:

- Type safety with TypeScript
- IntelliSense support in your IDE
- Compile-time checking of environment variable usage

## Error Handling

If required environment variables are missing, the application will:

1. Throw a clear error message indicating which variable is missing
2. Prevent the application from running with invalid configuration

## Adding New Environment Variables

1. **Update the interface in `env.ts`:**
   ```typescript
   export interface Env {
     YOUR_VARIABLE?: string  // Add your new variable
   }
   ```

2. **Add to the parse function:**
   ```typescript
   const parseEnv = (): Env => {
     const env: Env = {
       YOUR_VARIABLE: process.env.YOUR_VARIABLE,  // Add your new variable
     }
     return env
   }
   ```

3. **Update the config object in `config.ts` if needed:**
   ```typescript
   export const config = {
     // Add your configuration here
   }
   ```

4. **Update `env.example`:**
   ```
   # YOUR_VARIABLE=your-variable-value
   ``` 