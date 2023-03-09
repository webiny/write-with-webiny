import { StatusBar } from 'expo-status-bar';
import { useState,useContext } from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import { AppContext } from '../store/store';

export default function App({navigation}) {

    const [title,setTitle] = useState('');

    const [content,setContent] = useState('');

    const [formError,setFormError] = useState('');

    const {addNote,publishNote,loading,error} = useContext(AppContext);

    const handleAddNote = async () => {
        setFormError('');
        if(title && content){
            try{
                let response = await addNote(title,content);
                let publishResponse = await publishNote(response.id);
                if(publishResponse.id){
                    setTitle('');
                    setContent('');
                    navigation.navigate('Home');
                }
            }catch(error){
                setFormError(new Error(error).message);
            }
        }else{
            setFormError("Title and Content are required");
        }
    }

    return (
        <View style={styles.container}>
        {
            formError && <Text>Form Error : {formError}</Text>
        }
        {
            error && <Text>Error adding note : {error} </Text>
        }
        <TextInput
            placeholder='Title of note'
            value={title}
            onChangeText={text => setTitle(text)}
        />
        <TextInput
            placeholder='Content of note'
            value={content}
            onChangeText={text => setContent(text)}
        />
        <Button title={
            loading ? "Loading" : "Submit"
        } onPress={() => handleAddNote() } />
        <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});