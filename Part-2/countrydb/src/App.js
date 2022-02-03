import React,{useState, useEffect} from 'react'
import axios from 'axios'
const api_key = 'a0bd72dcbb3325ad252750f67c236a15';
//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

/*
const divMagnify={
  transform: 'scale(4)'

};


*/



const Countryinfo = (props) => {
 const [weather,setWeather]= useState(null)
  
  useEffect(()=>{
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${props.cty.capital}&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
       
      })}
  ,[props.cty.capital])

  console.log("weather",weather)
  let url= "http://openweathermap.org/img/wn/@2x.png" +weather.weather.icon+"@2x.png"
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
      

      <div >
        <h3>Flag</h3>

        {props.cty.flag}
      </div>

      {weather !== null && 
        <div>
        <h3>weather in {props.cty.capital}</h3>
          <p>Temperature: {Math.ceil(weather.main.temp -273.15)} Celsius</p>
          <img src={url} alt="weather icon"/>
  
          <p>Wind Speed: {weather.wind.speed} m/s</p>
  
        </div> }
      
      
    </div>
  )
}


const Displaycountry = (props) => {
  const [displayCountryIndex, setDisplayCountryIndex] = useState(-1);
  

  if (props.name.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {props.name.map((item, index) => {
        return (
          <li key={index}>
            {item.name.common}
            &nbsp; &nbsp;
            <button onClick={() => setDisplayCountryIndex(index)}>Show</button>
          </li>
        );
      })}
      {displayCountryIndex !== -1 && (
        <Countryinfo cty={props.name[displayCountryIndex]} />
      )}
    </div>
  );
};

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
