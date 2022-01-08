import React from 'react'

const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

const Header = (c)=>{ 
  
  
  return (  
    
    <div>
      {c.course.map((item)=><h1 key={item.id}>{item.name}</h1>) }

    </div>
    
    
    
    
    

      
  )
}
const Part = (p)=>{
  return(   
    <p>
      {p.part} , {p.exercise}
    </p>     
  )
}

const Content = (props)=>{
  //console.log(props[0].name)
  //{parts.map((item)=> <Part key={item.id} part={item.name} exercise={item.exercises}/>  )}
  const {parts}=props
  return (    
    <div>
      
      {parts.map((item) =>
        item.parts.map((item)=>
          <Part key={item.id} part={item.name} exercise={item.exercises}/>
        )
      )}
        
      
    </div>    
  )
}

const Total = (props)=>{
  const {parts}=props

  
// Number of exercises {parts.reduce((sum,item) => sum+= item.exercises,0)}
  return (
    <div>
        <p>
          Total no. of exercises, 
          {parts.map((item) =>
            item.parts.reduce((sum,item)=>{
              return sum+=item.exercises

            },0)
          )}
          
        </p>
    </div> 
  )
}

const Course = (props) => {

  return (
      <div>
        
        <Header course={props.course}/>

        <Content parts={props.course}/>

        <Total parts={props.course}/>
      </div>

  )
}

const App = ()=>{
  
  return (
    <div>
      
      <Course course={courses}/>       

    </div>
  )}

  export default App;