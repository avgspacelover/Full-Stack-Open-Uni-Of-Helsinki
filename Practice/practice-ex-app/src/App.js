import React, {useState} from 'react';

const App= () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])


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
      <button onClick= {handleLeftClicks}>
        left
      </button>

      <button onClick={handleRightClicks}>
        right
      </button>

      {right}

      <p>{allClicks.join(' ')}</p>
        
      
    </div>
  );
}

export default App;
