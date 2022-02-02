import React,{useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  //const [country, Setcountry]= useState([])

  useEffect(() => {
    axios
      .get('')
      .then(response => {
        console.log(response)
      })
  },[])



//<input value={} onChange={} />

  return (
    <div>
      <section>
        <h3>Search Country Database</h3>

        
      </section>
    </div>
    
  );
}

export default App;
