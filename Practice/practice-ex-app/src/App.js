import React, {useState} from 'react';

const History = (props) => {
  
  if(props.allClicks.length === 0){

    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )

  }

  return (
    
    <div>
      button press history: {props.allClicks.join(' ')}

    </div>
  )
}
const Button = ({handleClick,text}) => (
  
  
  <button onClick={handleClick}>
    {text}
  </button>
  
  
)

const App= () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])

  


  const handleLeftClicks = () => {  
    console.log('left click')
    
    setAll(allClicks.concat('L')) 
    setLeft(left +1)
    
  }

  const handleRightClicks = () => { 
    console.log('right click') 
    
    setAll(allClicks.concat('R'))
    setRight(right +1)
    
  }

  
  
  
 

  return (
    <div>
      {left}
      <Button handleClick= {handleLeftClicks} text="left" />
       
      

      <Button handleClick={handleRightClicks} text="right" />
        
      

      {right}

      <History allClicks={allClicks} />
        
      
    </div>
  )
}

export default App;
