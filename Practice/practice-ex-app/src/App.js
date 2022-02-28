import React, {useState, useEffect} from 'react'
import Note from './Components/Note'
import noteservice from './services/notes.js'


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    "A new note..."
  )

  const [showAll, setAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    noteservice
      .getAll()
      .then( intialNotes => {
        console.log('promise fulfilled')
        setNotes(intialNotes )
      })
  }, [])


 const toggleImportanceOf= (id)=> {
    
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteservice
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
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

    noteservice
      .create(noteObject)
      .then(returnedNote => {
        console.log(returnedNote)
        setNotes(notes.concat(returnedNote))
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








//json-server --port 3001 --watch db.json