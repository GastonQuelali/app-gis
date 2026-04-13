import { SERVER_CONFIG } from "./server";

export const AUTH_CONFIG = {
  API_URL: SERVER_CONFIG.BASE_URL,
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    VALIDATE_TOKEN: "/api/auth/validate",
  },
};
