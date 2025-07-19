// Environment variable types
export interface Env {
  // Add other environment variables here as needed
  _placeholder?: string // Temporary placeholder to avoid empty interface
}

// Parse and validate environment variables
const parseEnv = (): Env => {
  const env: Env = {
    // Add other environment variables here as needed
  }

  return env
}

// Export the parsed environment variables
export const env = parseEnv()

// Helper function to get required environment variables
export const getRequiredEnv = (key: keyof Env): string => {
  const value = env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

// Helper function to check if an environment variable exists
export const hasEnv = (key: keyof Env): boolean => {
  return !!env[key]
} 