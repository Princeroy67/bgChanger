import { useState, useCallback, useEffect ,useRef} from "react";

function App() {
  // State variables to manage password generation and options
  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  //useRef hook
  const passwordRef =useRef(null)

  // Function to generate a random password based on options
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str = str + "0123456789";
    }
    if (charAllowed) {
      str = str + "!@#$%^&*~_-`";
    }
    // Generating password
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass = pass + str.charAt(char);
    }
    // Updating the password state
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // UseEffect to trigger password generation when options change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);
  

  // Function to copy the generated password to the clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    
    // Implement this function to copy the password to the clipboard
    window.navigator.clipboard.writeText(password)

  },[password]);

  return (
    <>
      <div className="max-w-md mx-auto shadow-md rounded-lg text-white bg-black">
        <h1 className="text-4xl text-center text-white">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 p-5 text-pink-800">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
  className={`outline-none bg-blue-500 text-white px-3 py-0.5 button-copy ${
    isClicked ? "clicked" : ""
  }`}
  onClick={() => {
    copyToClipboard();
    setIsClicked(true); // Set a state to indicate the button is clicked
  }}
>
  Copy
</button>

        </div>
        <div className="flex text-sm gap-x-2">
          {/* Input for password length */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          {/* Checkbox for including numbers in the password */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prevValue) => !prevValue);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          {/* Checkbox for including special characters in the password */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prevValue) => !prevValue);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
