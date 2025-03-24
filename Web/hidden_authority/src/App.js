import React from 'react';
import Home from './Home';
import About from './About';
import CVEs from './CVEs';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hidden Authority</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#cves">CVEs</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="cves">
          <CVEs />
        </section>
      </main>
      <footer className="App-footer">
        <p>Contact us: contact@hiddenauthority.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Cybersecurity Lane, Secure City, SC 12345</p>
      </footer>
    </div>
  );
}

export default App;
