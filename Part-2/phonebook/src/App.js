import React, { useState, useEffect} from 'react'

import svManage from './services/httpops.js'


const Contact = ({name,number, deleteContact}) => {
  return (
    <div>
      <li >{name} : {number} &nbsp; <button onClick={deleteContact}>Delete</button> </li>
      <br></br>
    </div>

    

  )
}

const AddContact = (props) => {

  return (  

    <form onSubmit={props.addContact}>
          <h2> Add New Contact</h2>
          <div>
            Name: <input value={props.newName} onChange={props.handleNameChange}/>
          </div>
          <br/>
          <div>
            Number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
          </div>
          <br />
          <div>
            <button type="submit">add</button>
          </div>
      
    </form>

  )
}

const deleteContactHandler = (id) => {
  console.log("delete" + id )
  svManage
    .removeCont(id)

}
const SearchBookFn = (props) => {

  return (
    <div>
      <div>
            Name: 
              <input value={props.nameSearch} onChange={props.handleNameSearch}/>
          </div>

          <br/>
          <div>
            <button onClick={()=>props.setFilter(!props.filter)}>{props.filter?"Show All":"Search"}</button>

          </div> 
        
    </div>

  )
}


const SearchbookList = (props) => {

  return (
    <div>
      <ul style={{listStyleType:"none"}}>
        {props.search.map((item)=>
          < Contact key={item.id} name={item.name} number={item.number} deleteContact={() => deleteContactHandler(item.id)}/>)}

      </ul>
    </div>

  )
}

const PhonebookList = (props) => {

  return (
    <div>
      <ul style={{listStyleType:"none"}}>
        {props.persons.map((item)=>
          < Contact key={item.id} name={item.name} number={item.number} deleteContact={() => deleteContactHandler(item.id)} />)}

      </ul>
        
    </div>

  )
}





const App = () => {
  const [persons, setPersons] = useState([])
  
  





  useEffect(()=> { 

    svManage
      .getCont()
      .then((initialContacts)=>{
        
        setPersons(initialContacts)
      })
    
    },[])


  /*
  [
    { name: 'Arto Hellas',
      number: 9898982121,
      id:0 
    },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  */

  //--STATE MANAGEMENT--------------------------------------
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameSearch, setNameSearch] = useState('')
  const [filter, setFilter]= useState(false)
//--EVENT HANDLERS--------------------------------------
  const handleNameChange= (event) => { 
    setNewName(event.target.value)
  }

  const handleNumberChange= (event) => { 
    setNewNumber(event.target.value)
  }

  const handleNameSearch=(event) => {

    setNameSearch(event.target.value)   
  }
//---------LoGIC FUNCTIONS----------------------------------------
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
        id: persons.length+1
        
      }

      svManage
        .addCont(contactObj)  
        .then(newContact => {
          setPersons(persons.concat(newContact))
          setNewName('')
          setNewNumber('')

        })
      

    } else{
      window.alert(`${newName} is already present in the PhoneBook, please add another contact`)
    }   

  }

  const search=persons.filter(item => filter?item.name.toLowerCase().includes(nameSearch.toLowerCase()):item)
   

  return (
    <div>
      <h1>Phonebook</h1>
      
        <h2> Search </h2>
          
          <SearchBookFn nameSearch={nameSearch} handleNameSearch={handleNameSearch} filter={filter} setFilter={setFilter} />
              
          <SearchbookList search={search} />
      
          <AddContact addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
        <h2>Numbers</h2>
      
          <PhonebookList persons={persons} />

    </div>
  )
}

export default App

//json-server --port 3001 --watch db.json