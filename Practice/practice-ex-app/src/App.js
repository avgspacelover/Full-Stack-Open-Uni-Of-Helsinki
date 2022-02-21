import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './Components/Note'
//json-server --port 3001 --watch db.json

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    "A new note..."
  )

  const [showAll, setAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then( response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
/*
 //useEffect working----------
  const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])

*/

 const toggleImportanceOf= (id)=> {
   console.log(`importance of ${id} needs to be toggled`)
 }





  console.log('render', notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault()

    const noteObject= {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() >0.5,
      id: notes.length +1

    }

    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
      setNotes(notes.concat(response.data))
      setNewNote('')
    })

    // setNotes(notes.concat(noteObject))
    // setNewNote('')
    
  }

  const handleNoteChange= (event) => {
    
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
  ?notes 
  : notes.filter( note =>note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
          <button onClick={()=> setAll(!showAll)}>

            show {showAll? 'important':'all'}

          </button>
      </div>
      <ul>
        {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)} />            
        )}
        
      </ul>

      <form onSubmit={addNote}>
          <input 
            value={newNote}
            onChange={handleNoteChange} 
            />
          <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App