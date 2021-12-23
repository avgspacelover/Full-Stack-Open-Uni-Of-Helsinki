

import React from 'react'

const App = ()=>{
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const Header = (c)=>{

    return (
      <div>
          <h1>{c.course}</h1>
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

  const Content = ()=>{

    return (
      <div>
        <Part part={part1} exercise={exercises1} />

        <Part part={part2} exercise={exercises2}/>

        <Part part={part3} exercise={exercises3}/>


      </div>
    )

  }

  const Total = (p)=>{

    return (
      <div>
          <p>
            Number of exercises {p.ex1 + p.ex2 + p.ex3}
        </p>
      </div>
    )

  }


  return (
    <div>
      
        <Header course={course}/>

        <Content />

        <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}/>

    </div>
  )

}

export default App;
