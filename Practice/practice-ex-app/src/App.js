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

const App= () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])

  const Button = ({handleClick,text}) => {

    return(
      <button onClick={handleClick}>{text}</button>
    )
  }


  const handleLeftClicks = () => {  
    setLeft(left +1)
    setAll(allClicks.concat('L')) 
    
  }

  const handleRightClicks = () => {  
    setRight(right +1)
    setAll(allClicks.concat('R'))
    
  }

  
  
  
 

  return (
    <div>
      {left}
      <Button onClick= {handleLeftClicks} text="left" />
       
      

      <Button onClick={handleRightClicks} text="right" />
        
      

      {right}

      <History allClicks={allClicks} />
        
      
    </div>
  );
}

export default App;
