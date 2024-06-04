// validateEnv.ts
const requiredEnvVars = ["VITE_BASE_URL", "VITE_GEMINI_API_KEY"];

requiredEnvVars.forEach((varName) => {
  if (!import.meta.env[varName as keyof ImportMetaEnv]) {
    throw new Error(`Environment variable ${varName} is not set`);
  }
});

console.log("All required environment variables are set");
