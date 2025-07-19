import { env, getRequiredEnv, hasEnv } from './env'

// Export the environment variables and helper functions
export { env, getRequiredEnv, hasEnv }

// Configuration object for easy access
export const config = {
  // Add other configuration here as needed
} as const

// Type for the config object
export type Config = typeof config 