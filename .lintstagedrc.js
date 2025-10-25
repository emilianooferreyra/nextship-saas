module.exports = {
  // Run Biome check on staged files
  "*.{js,jsx,ts,tsx,json}": ["biome check --write --no-errors-on-unmatched"],

  // Run type check on TypeScript files (optional, can be slow)
  // "*.{ts,tsx}": () => "tsc --noEmit",
};
