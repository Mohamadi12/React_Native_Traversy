import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { FlatList } from "react-native-web";

const NotesScreen = () => {
  const [notes, setNotes] = useState([
    { id: "1", text: "Note One" },
    { id: "2", text: "Note Two" },
    { id: "3", text: "Note Three" },
  ]);
  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.text}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Note</Text>
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
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
   color: "#fff",
   fontWeight: "bold",
   fontSize: 18
  }
});
