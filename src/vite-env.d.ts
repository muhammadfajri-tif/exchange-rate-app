/// <reference types="vite/client" />

/**
 * Environment Variables
 *
 * VITE_BASE_URL: The base URL for the API.
 * VITE_GEMINI_API_KEY: The API key for the Gemini API.
 */

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
