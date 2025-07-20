declare module 'minimatch' {
  function minimatch(path: string, pattern: string, options?: Record<string, unknown>): boolean;
  export = minimatch;
} 