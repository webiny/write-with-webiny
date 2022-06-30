import React,{useState} from 'react'
import styles from './addnote.module.css';
import {addNote,publishNote} from '../../lib/api';
function AddNote(props) {

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [error,setError] = useState('');
    const [message,setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        // reset error and message.
        setError('');
        setMessage('');

        if(title){
            if(description) {
                let response = await addNote({ // add the note.
                    title,
                    description
                });

                response = await publishNote({ // publish the note.
                    id:response.id
                });

                if(response) {
                    // reset the fields
                    setTitle('');
                    setDescription('');
                    setMessage("Note added successfully.");
                    // append the note.
                    props.addNote(response);
                    // reset the show add note.
                    props.resetShowAddNote();
                }

                
            } else {
                setError("Description is required");
            }
        } else {
            setError('Title is required');
        }
    }


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                {
                    error ? (
                        <div className={styles.error}>
                            {error}
                        </div>
                    ) : null
                }

                {
                    message ? (
                        <div className={styles.message}>
                            {message}
                        </div>
                    ) : null
                }

                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} name="title" id="title" placeholder='Title' onChange={ (e) => setTitle(e.target.value) } />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={description} rows="4" placeholder='Describe it here...' onChange={ (e) => setDescription(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote