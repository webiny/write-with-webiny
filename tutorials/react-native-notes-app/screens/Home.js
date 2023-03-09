import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { useContext, useEffect } from 'react';
import { AppContext } from '../store/store';

export default function App({navigation}) {

  const {notes,getNotes,loading,error,deleteNote} = useContext(AppContext);

  useEffect( () => {
    getNotes();
  },[notes]);

  const handleDeleteNote = async (id) => {
    let res = await deleteNote(id);
    if(res){
        console.log("done");
    }else{
        console.log("an error occurred");
    }
  }

  return (
    <View style={styles.container}>
      {
        loading && <Text>Loading...</Text>
      }
      {
        error && <Text>{error}</Text>
      }
      {
        notes && notes.length > 0 && notes.map((note,index) => (
            <View key={index} style={styles.notesCard}>
                <Text style={styles.notesTitle}>{note.title}</Text>
                <Text style={styles.notesSubTitle}>{note.content}</Text>
                <Button title="Delete note" color="red" onPress={() => handleDeleteNote(note.id)} />
            </View>
        ))
      }

      <Button title="Add Note" onPress={ () => navigation.navigate("AddNote") } />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20
  },
  notesCard:{
    margin:10,
    shadowColor:"#fff",
    shadowOpacity:1
  },
  notesTitle:{
    fontWeight:"bold"
  },
  notesSubTitle:{
    fontWeight:"300"
  }
});