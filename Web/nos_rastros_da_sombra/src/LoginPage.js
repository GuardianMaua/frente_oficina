import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFlag(null);

    try {
      const response = await fetch('/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setFlag(data.flag);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Peter, não esqueça de remover suas credenciais do arquivo /creds.txt */}
      <div style={styles.overlay}></div>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>SombraCorp</h1>
        <p style={styles.subtitle}>Portal Administrativo</p>
        {error && <div style={styles.errorPopup}>{error}</div>}
        {flag && <div style={styles.flagPopup}>🎉 {flag} 🎉</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">Usuário</label>
            <input
              style={styles.input}
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Senha</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button style={styles.button} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

// Estilos em JavaScript
const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    backgroundColor: '#1a1a1a',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  },
  loginBox: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: '#222',
    padding: '2rem',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#aaa',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    textAlign: 'left',
    color: '#ccc',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#333',
    color: '#fff',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorPopup: {
    backgroundColor: '#ff4444',
    color: '#fff',
    padding: '0.8rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  flagPopup: {
    backgroundColor: '#44ff44',
    color: '#000',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
};

export default LoginPage;
