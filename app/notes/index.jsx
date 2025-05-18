import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import AddNoteModal from "../component/AddNoteModal";
import NoteList from "../component/NoteList";
import noteService from "../../services/noteService";
import { Alert } from "react-native";

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);
  // Fetch Notes
  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();

    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }
    setLoading(false);
  };

  // Add New Note
  const addNote = async () => {
    if (newNote.trim() === "") return;

    const response = noteService.addNote(newNote);

    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes([...notes, response.data]);
    }

    setNewNote("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} />
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>

        {/* Modal */}
        <AddNoteModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          addNote={addNote}
          newNote={newNote}
          setNewNote={setNewNote}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
});
