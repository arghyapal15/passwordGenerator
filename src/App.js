
import { useCallback, useEffect, useState,useRef } from 'react';
// import "./App.css"


function App() {

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [charallow, setCharallow] = useState(false)
  const [numallow, setNumallow] = useState(false)

  const el = useRef();
  const copytoClip = useCallback(() => {
    el.current?.select();
    el.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let char = "ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxtz";
    if (charallow) char += "!~@#$%^&*?";
    if (numallow) char += "1234567890"
    
    for (let index = 0; index <= length; index++) {
      const i = Math.floor(Math.random() * char.length + 1);
      pass += char.charAt(i);
    }
    setPassword(pass);
  },[length,charallow,numallow,setPassword])

  useEffect(() => {
    passwordGenerator();
  },[length,charallow,numallow,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto text-center shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3 text-3xl font-bold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={el}
            readOnly
        />
          <button
            onClick={copytoClip}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={50}
        value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
              id="numberInput"
              defaultChecked={numallow}
          onChange={()=>setNumallow(prev=> !prev)}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              id="characterInput"
              defaultChecked={charallow}
              onChange={()=> setCharallow(prev=> !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
      </div>

    </>
  );
}

export default App;
