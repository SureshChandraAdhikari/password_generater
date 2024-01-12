import { useState, useCallback, useEffect ,useRef} from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [chAllowed, setchAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)



  const passwordGenerater = useCallback( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYJabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(chAllowed) str += "~!@#$%^&*()_+{}:|"

    for (let i = 1; i < length; i++){
      let char = Math.random() * str.length + 1
       pass += str.charAt(char)
    }
    setPassword(pass)
  } , [length,numberAllowed,chAllowed,setPassword])  

 const copyPasswordToClip = useCallback(() =>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
 } ,[password])



     useEffect(() =>{
      passwordGenerater()
     } , [length , numberAllowed,chAllowed , setPassword])
   

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 '>
      <h1 className='text-white text-center'>Password Generater</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
        <input type="text" 
         value={password} 
         className='outline-none w-full py-1 px-3'

      placeholder='password'
      readOnly
      ref={passwordRef}
        
        />
        <button onClick = {copyPasswordToClip}   className='ouline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
       <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) =>{
                        setlength(e.target.value)
        }}
        />
        <label>Length : { length }</label>
        </div>
         <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setnumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={chAllowed}
              id="characterInput"
              onChange={() => {
                  setchAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>
    </div>
    
    
    
    
    </>
   
      
  )
}

export default App
