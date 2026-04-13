import * as SecureStore from "expo-secure-store";

const AUTH_STORAGE_KEY = "user-credentials";

interface UserCredentials {
  email: string;
}

class AuthService {
  async saveCredentials(email: string): Promise<boolean> {
    try {
      await SecureStore.setItemAsync(AUTH_STORAGE_KEY, JSON.stringify({ email }));
      return true;
    } catch (error) {
      console.log("Error saving credentials:", error);
      return false;
    }
  }

  async getStoredEmail(): Promise<string | null> {
    try {
      const stored = await SecureStore.getItemAsync(AUTH_STORAGE_KEY);
      if (stored) {
        const credentials: UserCredentials = JSON.parse(stored);
        return credentials.email;
      }
      return null;
    } catch (error) {
      console.log("Error getting email:", error);
      return null;
    }
  }

  async clearCredentials(): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync(AUTH_STORAGE_KEY);
      return true;
    } catch (error) {
      console.log("Error clearing credentials:", error);
      return false;
    }
  }
}

export const authService = new AuthService();