// src/config/apiConfig.js

/**
 * Central API Base URL Configuration.
 * Reads from VITE_API_BASE_URL or VITE_URL environment variables,
 * defaulting to http://localhost:8000 for local development.
 */
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_URL ||
  "http://localhost:8000"
).replace(/\/+$/, "");
