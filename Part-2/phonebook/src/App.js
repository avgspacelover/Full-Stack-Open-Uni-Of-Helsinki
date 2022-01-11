import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: 9898982121,
      id:0 
    },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameSearch, setNameSearch] = useState('')
  const [filter, setFilter]= useState(false)

  const Contact = (props) => {
    return (

      <li >{props.name} : {props.number}</li>

    )
  }

  const handleNameChange= (event) => { 
    setNewName(event.target.value)
  }

  const handleNumberChange= (event) => { 
    setNewNumber(event.target.value)
  }

  const handleNameSearch=(event) => {

    setNameSearch(event.target.value)
  }

  const checkForContactinBook=(nameStr, numberStr)=>{
    console.log('check handle',nameStr, persons[0].name)

    let flag= true;

  persons.forEach(element => {
    if(element.name === nameStr || element.number === numberStr)
      flag= false ;
      
      
    });

    return flag; 

  }
  

  const addContact = (event)=>{

    event.preventDefault()
    if(checkForContactinBook(newName,newNumber)){
      
      const contactObj ={
        
        name: newName,
        number: newNumber,
        id: persons.length
        
      }
      setPersons(persons.concat(contactObj))
      setNewName('')
      setNewNumber('')
      console.log(persons);

    } else{
      window.alert(`${newName} is already present in the PhoneBook, please add another contact`)
    }   

  }

  const search=persons.filter(item => filter?item.name.toLowerCase().includes(nameSearch.toLowerCase()):item)
  

  

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
          <h2> Search </h2>
          <div>
            Name: 
              <input value={nameSearch} onChange={handleNameSearch}/>
          </div>

          <br/>
          <div>
          <button onClick={()=>setFilter(!filter)}>Search</button>

          </div>
          
          

        
        <div>
          <ul style={{listStyleType:"none"}}>
            {search.map((item)=>
              < Contact key={item.id} name={item.name} number={item.number} />)}

            </ul>
        </div>

      </div>
        
      
        <form onSubmit={addContact}>
          <h2> Add New Contact</h2>
          <div>
            Name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <br/>
          <div>
            Number: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <br />
          <div>
            <button type="submit">add</button>
          </div>
      
        </form>
      <h2>Numbers</h2>
      <div>
        <ul style={{listStyleType:"none"}}>
        {persons.map((item)=>
          < Contact key={item.id} name={item.name} number={item.number} />)}

        </ul>
        
      </div>
    </div>
  )
}

export default App