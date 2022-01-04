import React, {useState} from 'react'

const course = {
  name:'Half Stack application development',
  parts: [
  {
    name:'Fundamentals of React',
    exercises: 10
  },
  {
    name:'Using props to pass data',
    exercises:7
  },
  {
    name:'State of a component',
    exercises:14
  }
]
}



const Header = (c)=>{ 
  
  return (    
    <h1>{c.course.name}</h1>   
  )
}
const Part = (p)=>{
  return(   
    <p>
      {p.part} , {p.exercise}
    </p>     
  )
}
const Content = (p)=>{
  return (    
    <div>
      <Part part={p.parts[0].name} exercise={p.parts[0].exercises} />

      <Part part={p.parts[1].name} exercise={p.parts[1].exercises}/>

      <Part part={p.parts[2].name} exercise={p.parts[2].exercises}/>
    </div>    
  )
}

const Total = (p)=>{
  return (
    <div>
        <p>
           Number of exercises {p.parts[0].exercises + p.parts[1].exercises + p.parts[2].exercises}
        </p>
    </div> 
  )
}



const App = ()=>{
  

  return (
    <div>
      
        <Header course={course}/>

        <Content parts={course.parts}/>

        <Total parts={course.parts}/>

      
        

    </div>
  )}

  export default App;