import React from "react";
import "./Home.css";
import { useState } from "react";

function Home() {

  window.role = "user"; 
  const [role, setRole] = useState("user");

  const decodeFlag = () => {
    const encodedFlag = [71, 85, 65, 82, 68, 73, 65, 78, 123, 72, 73, 68, 68, 51, 78, 95, 65, 85, 84, 72, 48, 82, 73, 84, 89, 125];
    return String.fromCharCode(...encodedFlag);
  };

  const handleExploreClick = () => {
    setRole(window.role);
    {role === "admin" ? alert(decodeFlag()) : alert("You do not have permission to access this content.")}
  };

  return (
    <div className="home-container">
      <h2>Welcome to Hidden Authority</h2>
      <p>Your trusted source for cybersecurity tips and resources.</p>
      <div className="home-content">
        <section>
          <h3>Why Cybersecurity Matters</h3>
          <p>
            In today's digital age, protecting your data and systems is more
            important than ever. Cyber threats are constantly evolving, and
            staying informed is the first step to staying safe.
          </p>
        </section>
        <section>
          <h3>Our Mission</h3>
          <p>
            At Hidden Authority, we aim to empower individuals and organizations
            with the knowledge and tools needed to safeguard their digital
            lives. From understanding vulnerabilities to implementing best
            practices, we've got you covered.
          </p>
        </section>
        <section>
          <h3>Get Started</h3>
          <p>
            Explore our resources to learn about common vulnerabilities, how to
            protect your data, and the latest trends in cybersecurity.
          </p>
          <button onClick={handleExploreClick}>Explore now</button>
        </section>
      </div>
    </div>
  );
}

export default Home;
