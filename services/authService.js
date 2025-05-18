import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

const authService = {
  // Register a new user
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      return {
        error: error.message || "Registration failed. Please try again.",
      };
    }
  },

  // Login a user
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      return {
        error: error.message || "Login failed. Please check your credentials.",
      };
    }
  },

  // Get logger in user
  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  // Logout a user
  async logout() {
    try {
      return account.deleteSession("current");
    } catch (error) {
      return {
        error: error.message || "Logout failed. Please try again.",
      };
    }
  },
};

export default authService;
