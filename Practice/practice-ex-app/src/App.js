import React, {useState} from 'react';

const Display = (props) => {
  return (
    <div>
        {props.counter}
    </div>
  )
}

const Button = (props) => {

  return (
    <button onClick={props.onClick}>
        {props.text}
    </button>
  )
}



const App= () => {

  const [counter, setCounter] = useState(0);

  
  const increaseByOne = () => setCounter(counter+1)
  const decreaseByOne =() => setCounter(counter -1)
  const setToZero = () => setCounter(0)
 

  return (
    <div>
      <Display counter={counter} />
        
        
      
      <Button onClick={increaseByOne} text='Plus'/>

      <Button onClick={decreaseByOne} text='Minus'/>
        
     
      <Button onClick={setToZero} text='Zero' />
        
      
    </div>
  );
}

export default App;
