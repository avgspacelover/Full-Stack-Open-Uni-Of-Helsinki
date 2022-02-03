import React,{useState, useEffect} from 'react'
import axios from 'axios'


/*
const divMagnify={
  transform: 'scale(4)'

};
*/



const Countryinfo = (props) => {
  console.log('1 item name',props.cty.name)
  console.log('multi item name',props.cty)
  console.log('lang',props.cty.languages)
  console.log('flag',props.cty.flag)   
  
  return(
    <div>

      <h1>{props.cty.name.official}</h1>
      <h4>aka {props.cty.name.common} </h4>

      <p>Capital: {props.cty.capital}</p>

      <p>Population: {props.cty.population}</p>

      <h2>Languages</h2>

      <ul>

        {Object.entries(props.cty.languages).map(([key,value],index)=> {
          return <li key={index}>{value}</li>
        })}
                
      </ul>
      <h3>Flag</h3>

      <div >
        {props.cty.flag}
      </div>

      
    </div>
  )
}


const Displaycountry= props => {
  const [showInfo, setShowInfo] = useState(false);

  console.log("length", props.name.length)
  let len= props.name.length;

   if(len>10){
     console.log('too many')
      return(
          <div>Too many matches, specify another filter</div>
      );
    } else if(len===1){
      
      return <Countryinfo cty={props.name[0]} />

    } else if(1<len && len<=10){
    
      return (
        <div>
          {props.name.map((item,index)=> {
            console.log("item", item);
            return( 
              
              
              <li key={index}>
                {item.name.common}
                  &nbsp;
                  &nbsp;
                  {showInfo ? 
                    <Countryinfo cty={item}/> : 
                    <button onClick={() => setShowInfo(true)}>
                    Show
                    </button>
                
                  }
                </li>
              
              
              
              );
          })}

        </div>
        
      );

    }else {
      return null
    }
}

function App() {
  const [countrydb, setCountrydb]= useState([])
  const [countryName, setCountryName]= useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        

        setCountrydb(response.data)
      })
  },[])

  const handleCountrySearch = (e)=>{
   
    console.log(e.target.value)
    setCountryName(countrydb.filter(item =>{

      return item.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    }))
  }

  return (
    <div>
      <section>
        
        <h3>Search Country Database</h3>

        <input  onChange={handleCountrySearch} />
        
      </section>

      <section>

        <Displaycountry name={countryName}/>

      </section>
    </div>
    
    
  );
}

export default App;
