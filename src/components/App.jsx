import React, { useState , useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"
function App() {

  const [notes, setNotes] = useState([]); // [] means no intial value notes is cpmpelety empty as of now 

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
        <Header />

        <CreateArea onAdd={addNote} /> 

         {/* time to render the notes  */
         notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}

        <Footer />
      
    </div>
  ); // return close 

}

export default App;
