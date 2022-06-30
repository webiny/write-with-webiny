import {useState} from 'react';
import Head from 'next/head';
import {getAllNotesForHome,deleteNote} from '../lib/api';
import Navbar from '../components/Navbar/Navbar';
import NoteCard from '../components/NoteCard/NoteCard';
import AddNote from '../components/AddNote/AddNote';
import styles from '../styles/Home.module.css';

export default function Home({allNotes}) {
  const [showAddNote,toggleShowAddNote] = useState(false);
  const [notes,setNotes] = useState(allNotes);
  const addNote = (note) => setNotes([...notes,note]);
  const resetShowAddNote = () => toggleShowAddNote(!showAddNote);
  const handleDeleteNote = (id) => {
    let result = deleteNote({id}); // delete the note.
    if(result){
      setNotes( notes.filter((note) => note.id !== id)); // filter the deleted note
    } else {

    }
  }

  return (
    <>
    <Head>
      <title>Notes App</title>
      <meta name="description" content="Notes App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />    
    <div className={styles.main}>
      <div className={styles.addNote}>
        <button onClick={resetShowAddNote}>
          {
            showAddNote ? "Back to Notes" : "Add a Note"
          }
        </button>
      </div>
      {
        showAddNote ? (
          <AddNote addNote={addNote} resetShowAddNote={resetShowAddNote}/> 
        ) : (          
          notes && notes.length > 0 ? (
            notes.map((note,index) => (
                <div key={index}>
                  <NoteCard cardData={note} handleDeleteNote={handleDeleteNote} />
                </div>
              ))
            ) : (
              <p>You do not have any notes saved...</p>
            )
          
        )
      }
    </div>
    </>
  )
}

export async function getServerSideProps({ preview }) {
  const allNotes = await getAllNotesForHome(preview);
  return {
    props: { allNotes },
  }
}
