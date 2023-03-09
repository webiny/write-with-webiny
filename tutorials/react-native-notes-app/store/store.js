import React,{createContext, useState} from 'react';
import Constants from 'expo-constants';

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const apiKey = Constants.manifest.extra.apiKey;

    const getNotes = async() => {
        setLoading(true);
        setError('');
        try{
            let url = Constants.manifest.extra.readUrl;
            let headers = {
                "content-type":"application/json",
                "Authorization": `Bearer ${apiKey}`
            };
            let graphqlQuery = {
                "operationName" : "fetchNotes",
                "query": `query fetchNotes{
                    listNotes{
                      data{
                        id
                        title
                        content
                        published
                      }
                    }
                  }`,
                "variables":{}
            };
            const options = {
                "method":"POST",
                "headers":headers,
                "body":JSON.stringify(graphqlQuery)
            };
            let response = await fetch(url,options);
            let data = await response.json();
            setNotes(data.data.listNotes.data);
            setLoading(false);
            setError('');
        }catch(e){
            setLoading(false);
            setError(new Error(e).message);
        }
    }

    const addNote = async (title,content) => {
        setLoading(true);
        setError('');
        try{    
            let url = Constants.manifest.extra.manageUrl;
            let headers = {
                "content-type":"application/json",
                "Authorization": `Bearer ${apiKey}`
            };
            let graphqlQuery = {
                "operationName":"addNote",
                "query":`mutation addNote($title:String!,$content:String!){
                    createNote(data:{title:$title,content:$content}){
                      data{
                        id
                        title
                        content
                      }
                    }
                  }`,
                "variables":{
                    "title":title,
                    "content":content
                }
            };
            const options = {
                "method":"POST",
                "headers":headers,
                "body":JSON.stringify(graphqlQuery)
            };
            let response = await fetch(url,options);
            let data = await response.json();
            setLoading(false);
            setError('');
            return data.data.createNote.data;
        }catch(error){
            setLoading(false);
            setError(new Error(error).message);
        }
    }

    const publishNote = async(id) => {
        setLoading(true);
        setError('');
        try{    
            let url = Constants.manifest.extra.manageUrl;
            let headers = {
                "content-type":"application/json",
                "Authorization": `Bearer ${apiKey}`
            };
            let graphqlQuery = {
                "operationName":"publishNote",
                "query":`mutation publishNote($id:ID!){
                    publishNote(revision:$id){
                      data{
                        id
                        title
                        content
                      }
                    }
                  }`,
                "variables":{
                    "id":id,
                }
            };
            const options = {
                "method":"POST",
                "headers":headers,
                "body":JSON.stringify(graphqlQuery)
            };
            let response = await fetch(url,options);
            let data = await response.json();
            setLoading(false);
            let newNote = data.data.publishNote.data;
            setNotes([newNote,...notes]);
            setError('');
            return data.data.publishNote.data;
        }catch(error){
            setLoading(false);
            setError(new Error(error).message);
        }
    }

    const deleteNote = async (id) => {
        setLoading(true);
        setError('');
        try{
            let url = Constants.manifest.extra.manageUrl;
            let headers = {
                "content-type":"application/json",
                "Authorization": `Bearer ${apiKey}`
            };
            let graphqlQuery = {
                "operationName":"deleteNote",
                "query":`mutation deleteNote($id:ID!){
                    deleteNote(revision:$id){
                      data
                    }
                  }`,
                "variables":{
                    "id":id,
                }
            };
            const options = {
                "method":"POST",
                "headers":headers,
                "body":JSON.stringify(graphqlQuery)
            };
            let response = await fetch(url,options);
            let data = await response.json();
            setLoading(false);
            setError('');
            if(data.data.deleteNote.data){
                setNotes(notes.filter(note => note.id !== id));
            }
            return data.data.deleteNote.data;
        }catch(error){
            setLoading(false);
            setError(new Error(error).message);
        }
    }

    return (
        <AppContext.Provider value={{notes,setNotes,loading,setLoading,error,setError,getNotes,addNote,publishNote,deleteNote}}>
            {children}
        </AppContext.Provider>
    )
}

export {
    AppContext,
    AppContextProvider
}