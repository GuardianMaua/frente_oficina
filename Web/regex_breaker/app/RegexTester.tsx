import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const complexRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
  
  const checkInput = () => {
    if (complexRegex.test(userInput)) {
      alert("Flag: GUARDIAN{R3GEX_BRE4K3R}");
      setErrorMessage(""); // Clear error message if input is valid
    } else {
      setErrorMessage("A senha não atende aos requisitos do sistema.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-6">

      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg">
        <label className="block mb-2">Envie sua senha:</label>
        <input 
          type="text" 
          placeholder="Digite aqui..." 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-2 text-white rounded"
        />
        <button onClick={checkInput} className="mt-4 w-full bg-blue-500 p-2 rounded text-white">Enviar</button>
        
        {/* Exibe a mensagem de erro se a senha não atender aos requisitos */}
        {errorMessage && (
          <div className="mt-2 text-red-500">{errorMessage}</div>
        )}
      </div>

      <script>
        {/* Hidden regex pattern in the HTML for users who inspect the page */}
        {`const complexRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$/;`}
      </script>
    </div>
  );
};

export default HomePage;
