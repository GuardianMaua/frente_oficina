import React from 'react';
import { FaShieldAlt, FaLock, FaUserSecret, FaGlobe, FaTools } from 'react-icons/fa';
import './About.css';

function About() {

  return (
    <div className="about-container">
      <h2>About Hidden Authority</h2>
      <p>
        Hidden Authority is dedicated to providing the latest insights and resources 
        to help individuals and businesses stay safe online. Our mission is to empower 
        everyone with the knowledge to protect their digital lives.
      </p>
      <div className="about-icons">
        <div>
          <FaShieldAlt size={50} />
          <p>Security First</p>
        </div>
        <div>
          <FaLock size={50} />
          <p>Data Protection</p>
        </div>
        <div>
          <FaUserSecret size={50} />
          <p>Privacy Matters</p>
        </div>
        <div>
          <FaGlobe size={50} />
          <p>Global Reach</p>
        </div>
        <div>
          <FaTools size={50} />
          <p>Practical Tools</p>
        </div>
      </div>
      <section className="about-details">
        <h3>Our Vision</h3>
        <p>
          We envision a world where everyone has the tools and knowledge to navigate the digital 
          landscape safely. By staying ahead of emerging threats and providing actionable advice, 
          we aim to make cybersecurity accessible to all.
        </p>
        <h3>What We Offer</h3>
        <ul>
          <li>Comprehensive guides on cybersecurity best practices.</li>
          <li>Insights into the latest vulnerabilities and how to mitigate them.</li>
          <li>Tools and resources to help secure your digital assets.</li>
          <li>Expert advice tailored to individuals and businesses.</li>
        </ul>
      </section>
    </div>
  );
}

export default About;