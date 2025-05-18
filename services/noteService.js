import databaseService from "./databaseService";
import { ID } from "react-native-appwrite";

// Appwrite database ID and collection ID

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // Get Notes
  async getNotes() {
    const response = await databaseService.getDocuments(dbId, colId);

    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },

  // Create Note
  async addNote(text) {
    if (!text) {
      return { error: "Text is required" };
    }
    const data = {
      text: text,
      createdAt: new Date().toISOString(),
    };
    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },

  // Update Note
  async updateNote(id, text) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      text,
    });
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },

  // Delete Note
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }
    return { success: true };
  },
};

export default noteService;
