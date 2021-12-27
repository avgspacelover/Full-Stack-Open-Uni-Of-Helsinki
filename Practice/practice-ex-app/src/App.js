import React, {useState} from 'react';


  



const App= () => {

  const [clicks, setClicks] = useState({
    left:0,
    right:0
  })


  const handleLeftClicks = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1
      
    }
    setClicks(newClicks)
  }

  const handleRightClicks = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right+1
    }

    setClicks(newClicks)
  }
  
  
 

  return (
    <div>
      {clicks.left}
      <button onClick= {handleLeftClicks}>
        left
      </button>

      <button onClick={handleRightClicks}>
        right
      </button>

      {clicks.right}
        
      
    </div>
  );
}

export default App;
