import React, { useEffect } from 'react';

const LoginFailed = () => {
  useEffect(() => {
    // Tentando acessar o arquivo secure.js
    fetch('/secure.js')
      .then(response => response.text())
      .then(data => console.log("Secure.js content:", data))
      .catch(error => console.error('Erro ao carregar secure.js:', error));
  }, []);

  return (
    <div className="container">
      <h1>Login Inválido</h1>
      <p>As credenciais informadas estão incorretas. Tente novamente.</p>
    </div>
  );
}

export default LoginFailed;
