import React, {useState} from 'react';



const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) =>() => {
    console.log('hello', who)
    setValue(0)
  }
    
  

  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}

export default App;
